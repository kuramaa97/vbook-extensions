load('config.js');
function execute() {
    let response = fetch(BASE_URL);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let seen = {};
    let genres = [];
    doc.select("a[href*='/genre/']").forEach(function (el) {
        let title = el.text();
        let href = el.attr("href");
        if (title && href && !seen[href]) {
            seen[href] = true;
            genres.push({
                title: title,
                input: href,
                script: "search.js"
            });
        }
    });

    genres.unshift({
        title: "All",
        input: "/novelslisting/",
        script: "search.js"
    });

    if (genres.length === 0) return Response.error("No genres found");

    return Response.success(genres);
}
