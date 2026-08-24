let BASE_URL = "https://luottruyen.com";
try {
    if (DOMAIN) {
        BASE_URL = DOMAIN;
    }
} catch (error) {
}

function normalizeUrl(url) {
    return url.replace(/^https?:\/\/[^\/]+/, BASE_URL);
}
