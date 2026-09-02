let BASE_URL = "https://www.xtruyen.vn";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN.replace(/\/+$/, "");
    }
} catch (error) {
}

function normalizeUrl(url) {
    if (!url) return BASE_URL;
    if (url.indexOf("//") === 0) return "https:" + url;
    if (url.indexOf("/") === 0) return BASE_URL + url;
    return url.replace(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img, BASE_URL);
}

function firstText(doc, selectors) {
    for (let i = 0; i < selectors.length; i++) {
        let text = doc.select(selectors[i]).first().text();
        if (text) return text.trim();
    }
    return "";
}

function firstHtml(doc, selectors) {
    for (let i = 0; i < selectors.length; i++) {
        let html = doc.select(selectors[i]).first().html();
        if (html) return html;
    }
    return "";
}

function firstAttr(doc, selectors, attr) {
    for (let i = 0; i < selectors.length; i++) {
        let value = doc.select(selectors[i]).first().attr(attr);
        if (value) return normalizeUrl(value);
    }
    return "";
}

function cleanText(text) {
    return (text || "").replace(/\s+/g, " ").trim();
}
