load('config.js');
function extractImages(doc) {
    let result = [];
    let seen = {};
    doc.select("div.reading-detail img").forEach(function (el) {
        let src = el.attr("data-src") || el.attr("src");
        if (!src) return;
        src = src.trim();
        if (!src) return;
        if (src.indexOf("//") === 0) src = "https:" + src;
        if (src.indexOf("dichvucdn.com") === -1 && src.indexOf("luottruyen.com") === -1) return;
        if (seen[src]) return;
        seen[src] = true;
        result.push(src);
    });
    return result;
}

function execute(url) {
    url = normalizeUrl(url);

    let images = [];
    let response = fetch(url);
    if (response.ok) {
        let doc = response.html();
        if (!doc.select("div.reading-detail").isEmpty()) {
            images = extractImages(doc);
        }
    }

    if (images.length === 0) {
        let browser = Engine.newBrowser();
        try {
            browser.launch(url, 10000);
            sleep(3000);
            images = extractImages(browser.html());
        } finally {
            browser.close();
        }
    }

    if (images.length === 0) return Response.error("Không tìm thấy ảnh");

    return Response.success(images);
}
