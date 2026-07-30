load('config.js');
function execute() {
    let response = fetch(BASE_URL);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let genres = [];
    doc.select(".menugameMb a[href*='/tim-truyen']").forEach(function (el) {
        let title = el.attr("title");
        if (!title) {
            title = el.text();
            title = title.replace(/\s+\d+$/, "");
        }
        if (title && title.length > 0) {
            genres.push({
                title: title,
                input: el.attr("href"),
                script: "search.js"
            });
        }
    });

    if (genres.length === 0) return Response.error("Không tìm thấy thể loại");

    return Response.success(genres);
}
