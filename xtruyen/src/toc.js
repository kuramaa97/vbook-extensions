load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);

    let doc = response.html();
    let list = [];
    let seen = {};
    doc.select(".wp-manga-chapter a, .listing-chapters_wrap a, .chapter-list a, .list-chapter a, a[href*='/chuong-']").forEach(function (e) {
        let href = normalizeUrl(e.attr("href"));
        let name = cleanText(e.text());
        if (!href || !name || seen[href]) return;
        seen[href] = true;
        list.push({
            name: name,
            url: href,
            host: BASE_URL
        });
    });

    return Response.success(list.reverse());
}
