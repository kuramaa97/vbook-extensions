load('config.js');
function execute() {
    let response = fetch(BASE_URL);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let genres = doc.select("ul.sub-menu.genres a").map(function (el) {
        return {
            title: el.select("h3").text(),
            input: el.attr("href"),
            script: "search.js"
        };
    });

    return Response.success(genres);
}
