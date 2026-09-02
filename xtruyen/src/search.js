load('config.js');
function execute(query, page) {
    page = page || "1";
    let url = buildUrl(query || "", page);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);

    let doc = response.html();
    let list = [];
    let seen = {};
    let selectors = [
        ".page-item-detail",
        ".c-tabs-item",
        ".row.c-tabs-item__content",
        ".listupd .bs",
        "div[itemscope]",
        "article"
    ];

    for (let i = 0; i < selectors.length && list.length === 0; i++) {
        doc.select(selectors[i]).forEach(function (e) {
            let linkNode = e.select(".post-title a, .item-summary .post-title a, h3 a, h4 a, h5 a, .truyen-title a, a[href*='/truyen/']").first();
            let link = normalizeUrl(linkNode.attr("href"));
            let name = cleanText(linkNode.text() || e.select("a[href*='/truyen/']").first().attr("title"));
            if (!name || !link || seen[link] || link.indexOf("/chuong-") !== -1) return;

            seen[link] = true;
            let cover = firstAttr(e, [
                "img[data-src]",
                "img[data-lazy-src]",
                "img[data-original]",
                "img[src]"
            ], "data-src");
            if (!cover) cover = firstAttr(e, ["img[data-lazy-src]"], "data-lazy-src");
            if (!cover) cover = firstAttr(e, ["img[data-original]"], "data-original");
            if (!cover) cover = firstAttr(e, ["img[src]"], "src");

            list.push({
                name: name,
                link: link,
                cover: cover,
                description: cleanText(e.select(".chapter a, .latest-chap a, .list-chapter a, a[href*='/chuong-']").first().text()),
                tag: cleanText(e.select(".mg_author, .author, .post-on, .chapter").first().text()),
                host: BASE_URL
            });
        });
    }

    let next = "";
    let nextHref = doc.select(".pagination .next, .wp-pagenavi .nextpostslink, a.next, a[rel=next]").first().attr("href");
    if (nextHref) {
        next = normalizeUrl(nextHref);
    } else if (list.length > 0 && doc.select(".pagination a, .wp-pagenavi a, nav.navigation a").text().indexOf((parseInt(page) + 1).toString()) !== -1) {
        next = (parseInt(page) + 1).toString();
    }

    return Response.success(list, next);
}

function buildUrl(query, page) {
    if (page && page.indexOf("http") === 0) return normalizeUrl(page);
    let p = parseInt(page || "1");
    if (query.indexOf("http") === 0 || query.indexOf("/") === 0) {
        let base = normalizeUrl(query).replace(/\/page\/\d+\/?/, "/");
        if (p <= 1) return base;
        let hash = base.indexOf("?") >= 0 ? base.substring(base.indexOf("?")) : "";
        let path = hash ? base.substring(0, base.indexOf("?")).replace(/\/?$/, "/") : base.replace(/\/?$/, "/");
        return path + "page/" + p + "/" + hash;
    }
    return BASE_URL + "/?s=" + encodeURIComponent(query) + "&post_type=wp-manga&paged=" + p;
}
