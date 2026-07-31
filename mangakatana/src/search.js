load('config.js');
function execute(query, page) {
    query = query || "";
    page = page || "";

    let url;
    if (page) {
        url = page;
    } else if (query.indexOf("/") === 0 || query.indexOf("http") === 0) {
        url = query.indexOf("http") === 0 ? query : BASE_URL + query;
    } else {
        url = BASE_URL + "/?search=" + encodeURIComponent(query);
    }
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let items = doc.select("#book_list > .item").map(function (el) {
        return {
            name: el.select(".text h3.title a").text(),
            cover: el.select(".media .wrap_img img").attr("src"),
            link: el.select(".text h3.title a").attr("href"),
            description: el.select(".text .summary").text(),
            tag: el.select(".media .status").text()
        };
    });

    let next = "";
    let nextEl = doc.select("ul.uk-pagination a.next.page-numbers");
    if (!nextEl.isEmpty()) {
        next = nextEl.first().attr("href");
    }

    return Response.success(items, next);
}
