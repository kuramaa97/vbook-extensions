load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let chapters = [];
    doc.select(".chapters table .chapter a").forEach(function (el) {
        chapters.push({
            name: el.text(),
            url: el.attr("href"),
            description: "",
            lock: false,
            pay: false
        });
    });

    chapters.reverse();

    return Response.success(chapters);
}
