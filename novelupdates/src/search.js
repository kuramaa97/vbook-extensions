load('config.js');
function execute(query, page) {
    query = query || "";
    page = page || "1";

    let url;
    if (query.indexOf("/") === 0 || query.indexOf("http") === 0) {
        let base = query.indexOf("http") === 0 ? query : BASE_URL + query;
        var separator = base.indexOf("?") === -1 ? "?" : "&";
        url = base + separator + "pg=" + page;
    } else {
        url = BASE_URL + "/?s=" + encodeURIComponent(query) + "&post_type=seriesplans&page=" + page;
    }

    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let items = doc.select(".search_main_box_nu").map(function (el) {
        return {
            name: el.select(".search_title a").text(),
            cover: el.select(".search_img_nu img").attr("src"),
            link: el.select(".search_title a").attr("href"),
            description: el.select(".search_stats").text()
        };
    });

    if (items.length === 0) {
        items = doc.select("article, .w-blog-entry, .post").map(function (el) {
            return {
                name: el.select("h2 a, h3 a").text(),
                cover: el.select("img").attr("src"),
                link: el.select("h2 a, h3 a").attr("href"),
                description: el.select(".entry-summary, p").text()
            };
        });
    }

    let hasNext = doc.select("a.next_page, em.current + a[href]").size() > 0;
    let nextPage = hasNext ? (parseInt(page) + 1).toString() : "";

    return Response.success(items, nextPage);
}
