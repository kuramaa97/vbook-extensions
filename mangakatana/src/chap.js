load('config.js');
function execute(url) {
    url = normalizeUrl(url);
    let response = fetch(url);
    if (!response.ok) return Response.error("HTTP " + response.status);

    // Page images are lazy-loaded into <img data-src="#"> placeholders by JS;
    // the real URLs live in the inline var thzq=[...] array (fallback ytaw).
    let text = response.text();
    let match = text.match(/var thzq=\[([\s\S]*?)\];/);
    if (!match) match = text.match(/var ytaw=\[([\s\S]*?)\];/);
    if (!match) return Response.error("Không tìm thấy ảnh");

    let urls = [];
    let re = /'([^']+)'/g;
    let m;
    while ((m = re.exec(match[1])) !== null) {
        urls.push(m[1]);
    }

    return Response.success(urls);
}
