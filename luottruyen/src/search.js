load('config.js');
function execute(query, page) {
    query = query || "";
    page = page || "1";

    let url;
    if (query.indexOf("/") === 0 || query.indexOf("http") === 0) {
        let base = query.indexOf("http") === 0 ? query : BASE_URL + query;
        var separator = base.indexOf("?") === -1 ? "?" : "&";
        url = base + separator + "page=" + page;
    } else {
        url = BASE_URL + "/tim-truyen?q=" + encodeURIComponent(query) + "&page=" + page;
    }

    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let items = doc.select(".items .item").map(function (el) {
        return {
            name: el.select("figcaption h3 a").text(),
            cover: el.select("div.image img").attr("src"),
            link: el.select("figcaption h3 a").attr("href"),
            description: el.select("li.chapter a").text(),
            tag: el.select("span.hot-badge-small").text()
        };
    });

    let hasNext = doc.select("li.next.disabled").isEmpty() && doc.select("li.next a[href]").size() > 0;
    let nextPage = hasNext ? (parseInt(page) + 1).toString() : "";

    return Response.success(items, nextPage);
}
