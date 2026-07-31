load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let genreLinks = doc.select("ul.meta .genres a");
    let genres = [
        {
            title: "Same Genre",
            input: genreLinks.isEmpty() ? "" : genreLinks.first().attr("href"),
            script: "search.js"
        }
    ];

    return Response.success({
        name: doc.select("h1").text(),
        author: doc.select("ul.meta .authors").text(),
        cover: doc.select(".cover picture img").attr("src"),
        description: doc.select(".summary p").html(),
        detail: doc.select("ul.meta.d-table").html(),
        url: url,
        type: "comic",
        format: "comic",
        ongoing: doc.select("ul.meta .status").text().indexOf("Ongoing") !== -1,
        tags: genreLinks.map(function (el) {
            return { title: el.text(), input: el.attr("href"), script: "search.js" };
        }),
        genres: genres,
        suggests: [],
        reviews: [],
        comments: []
    });
}
