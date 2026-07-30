load('config.js');
function execute(url) {
    url = normalizeUrl(url);

    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let storyId = doc.select("input#storyID").attr("value");
    if (!storyId) {
        return Response.error("Không tìm thấy ID truyện");
    }

    let chapterResponse = fetch(BASE_URL + "/Story/ListChapterByStoryID", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "StoryID=" + storyId
    });
    if (!chapterResponse.ok) return Response.error("HTTP " + chapterResponse.status);

    let chapterHtml = chapterResponse.text();
    let chapterDoc = Html.parse(chapterHtml);

    let chapters = [];
    chapterDoc.select("a[href*='/truyen-tranh/']").forEach(function (el) {
        chapters.push({
            name: el.text(),
            url: el.attr("href"),
            description: "",
            lock: false,
            pay: false
        });
    });

    if (chapters.length === 0) return Response.error("Không tìm thấy chapter nào");

    return Response.success(chapters);
}
