load('config.js');
function execute(url) {
    url = normalizeUrl(url);

    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let images = doc.select("div.reading-detail img");
    if (images.isEmpty()) images = doc.select("div.reading img");
    if (images.isEmpty()) images = doc.select("img.page-chapter");
    if (images.isEmpty()) images = doc.select("div#imageContainer img");
    if (images.isEmpty()) images = doc.select("div.content img");
    if (images.isEmpty()) images = doc.select("img[src*='http']");

    if (images.isEmpty()) {
        let browser = Engine.newBrowser();
        let bDoc = browser.launch(url, 10000);
        sleep(3000);
        bDoc = browser.html();
        browser.close();

        let bImages = bDoc.select("div.reading-detail img");
        if (bImages.isEmpty()) bImages = bDoc.select("div.reading img");
        if (bImages.isEmpty()) bImages = bDoc.select("img.page-chapter");
        if (bImages.isEmpty()) bImages = bDoc.select("div#imageContainer img");
        if (bImages.isEmpty()) bImages = bDoc.select("div.content img");
        if (bImages.isEmpty()) bImages = bDoc.select("img[src*='http']");

        if (bImages.isEmpty()) return Response.error("Không tìm thấy ảnh");

        images = bImages;
    }

    let result = images.map(function (el) {
        return el.attr("data-src") || el.attr("src");
    });

    return Response.success(result);
}
