load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let name = doc.select("div.seriestitlenu").text();
    if (!name) name = doc.select("title").text().replace(" - Novel Updates", "");

    let cover = doc.select("div.seriesimg img").attr("src");
    let author = doc.select(".nauthor").text();

    let description = doc.select("#editdescription").html();
    if (!description) description = "";

    let tags = doc.select("#seriesgenre a.genre").map(function (el) {
        return { title: el.text(), input: el.attr("href"), script: "search.js" };
    });

    let typeText = doc.select("#showtype").text();
    let statusText = doc.select("#showstatus").text();
    let ongoing = true;
    if (statusText) {
        ongoing = statusText.toLowerCase().indexOf("complete") === -1;
    }

    let detail = "";
    if (typeText) detail += "<p><b>Type:</b> " + typeText + "</p>";
    if (statusText) detail += "<p><b>Status:</b> " + statusText + "</p>";

    let genHref = tags.length > 0 ? tags[0].input : "/novelslisting/";

    return Response.success({
        name: name,
        author: author,
        cover: cover,
        description: description,
        detail: detail,
        url: url,
        type: "novel",
        format: "novel",
        ongoing: ongoing,
        tags: tags,
        genres: [
            { title: "Same Genre", input: genHref, script: "search.js" }
        ],
        suggests: [],
        reviews: [],
        comments: []
    });
}
