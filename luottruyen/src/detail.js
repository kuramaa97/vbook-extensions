load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let name = doc.select("h1.title-detail").text();
    let cover = doc.select("div.avatar img").attr("src");
    let author = doc.select("li.author.row p.col-xs-10").text();
    let statusText = doc.select("li.status.row p.col-xs-10").text();
    let ongoing = statusText.indexOf("Hoàn") === -1;

    let tags = doc.select("li.kind.row a.tr-theloai").map(function (el) {
        return { title: el.text(), input: el.attr("href"), script: "search.js" };
    });

    let description = doc.select("div.detail-content p#summary").html();

    if (!description) description = "";

    return Response.success({
        name: name,
        author: author,
        cover: cover,
        description: description,
        detail: "",
        url: url,
        type: "comic",
        format: "comic",
        ongoing: ongoing,
        tags: tags,
        genres: [],
        suggests: [],
        reviews: [],
        comments: []
    });
}
