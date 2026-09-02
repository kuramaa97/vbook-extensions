load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);

    let doc = response.html();
    doc.select("script, style, iframe, noscript, form, audio, video").remove();
    doc.select(".adsbygoogle, .ads, .advertisement, .code-block, .breadcrumb, .nav-links, .chapter-nav, .reading-controls, .entry-header").remove();
    doc.select("a").forEach(function (e) {
        if (cleanText(e.text()).match(/^(chuong truoc|chuong tiep|previous|next)$/i)) e.remove();
    });

    let title = firstText(doc, [".chapter-heading", ".chapter-title", ".entry-title", "h1", "h2"]);
    let content = firstHtml(doc, [
        ".text-left",
        ".reading-content .text-left",
        ".reading-content",
        ".chapter-content",
        ".entry-content",
        ".cha-words",
        "article"
    ]);
    if (!content) return Response.error("Khong tim thay noi dung chuong");

    return Response.success(content, title);
}
