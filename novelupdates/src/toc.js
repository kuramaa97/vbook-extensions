load('config.js');
function execute(url) {
    url = normalizeUrl(url);

    let chapters = [];
    let page = 1;
    let hasNext = true;

    while (hasNext) {
        let pageUrl = url;
        if (page > 1) {
            pageUrl = url + (url.indexOf("?") === -1 ? "?" : "&") + "pg=" + page + "#myTable";
        }
        let response = fetch(pageUrl);
        if (!response.ok) break;
        let doc = response.html();

        doc.select("table#myTable tbody tr").forEach(function (row) {
            let dateTd = row.select("td").first();
            let groupTd = row.select("td").size() > 1 ? row.select("td").get(1) : null;
            let chapTd = row.select("td").size() > 2 ? row.select("td").get(2) : null;

            let name = chapTd ? chapTd.select("span").text() : "";
            let groupLink = groupTd ? groupTd.select("a").attr("href") : "";
            let groupName = groupTd ? groupTd.select("a").text() : "";
            let date = dateTd ? dateTd.text() : "";

            if (name) {
                chapters.push({
                    name: name,
                    url: groupLink || url,
                    description: date + (groupName ? " - " + groupName : ""),
                    lock: false,
                    pay: false
                });
            }
        });

        let nextPage = doc.select("a.next_page, em.current + a[href]");
        hasNext = !nextPage.isEmpty();
        page++;
    }

    if (chapters.length === 0) return Response.error("No chapters found");

    return Response.success(chapters);
}
