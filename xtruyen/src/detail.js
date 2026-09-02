load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);

    let doc = response.html();
    let genres = [];
    doc.select(".genres-content a, .summary-content a[href*='/theloai/'], .post-content_item a[href*='/theloai/'], a[rel=tag]").forEach(function (e) {
        let title = cleanText(e.text());
        let href = e.attr("href");
        if (title && href) genres.push({ title: title, input: normalizeUrl(href), script: "search.js" });
    });

    let authorNode = doc.select(".author-content a, .summary-content a[href*='/tac-gia/'], .post-content_item a[href*='/tac-gia/']").first();
    let author = cleanText(authorNode.text());
    let suggests = [];
    if (authorNode.attr("href")) {
        suggests.push({ title: "Cung tac gia", input: normalizeUrl(authorNode.attr("href")), script: "search.js" });
    }

    let detail = firstHtml(doc, [".post-content", ".summary_content", ".manga-excerpt", ".info", ".story-detail-info"]);
    let description = firstHtml(doc, [
        ".description-summary .summary__content",
        ".description-summary",
        ".manga-excerpt",
        ".summary__content",
        ".desc",
        "#story-detail"
    ]);

    return Response.success({
        name: firstText(doc, ["h1", ".post-title h1", ".story-title", ".title"]),
        cover: firstAttr(doc, [
            ".summary_image img[data-src]",
            ".summary_image img[data-lazy-src]",
            ".summary_image img[src]",
            ".book img",
            ".story-detail-img img"
        ], "data-src") || firstAttr(doc, [".summary_image img[data-lazy-src]"], "data-lazy-src") || firstAttr(doc, [".summary_image img[src]", ".book img", ".story-detail-img img"], "src"),
        author: author,
        description: description,
        detail: detail,
        ongoing: cleanText(detail).toLowerCase().indexOf("dang ra") !== -1 || cleanText(detail).toLowerCase().indexOf("ongoing") !== -1,
        genres: genres,
        suggests: suggests,
        host: BASE_URL,
        url: url,
        type: "novel",
        format: "novel"
    });
}
