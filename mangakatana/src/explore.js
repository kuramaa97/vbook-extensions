load('config.js');
function execute() {
    let response = fetch(BASE_URL);
    if (!response.ok) return Response.error("HTTP " + response.status);
    let doc = response.html();

    let bannerItems = doc.select("ul.slick_book > li").map(function (el) {
        return {
            name: el.select(".title a").text(),
            cover: el.select(".wrap_img img").attr("src"),
            link: el.select(".title a").attr("href")
        };
    });

    let latestItems = doc.select("#book_list > .item").map(function (el) {
        return {
            name: el.select(".text h3.title a").text(),
            cover: el.select(".media .wrap_img img").attr("src"),
            link: el.select(".text h3.title a").attr("href"),
            description: el.select(".text .summary").text(),
            tag: el.select(".media .status").text()
        };
    });

    let newResponse = fetch(BASE_URL + "/new-manga");
    let newItems = [];
    if (newResponse.ok) {
        newItems = newResponse.html().select("#book_list > .item").map(function (el) {
            return {
                name: el.select(".text h3.title a").text(),
                cover: el.select(".media .wrap_img img").attr("src"),
                link: el.select(".text h3.title a").attr("href"),
                description: el.select(".text .summary").text(),
                tag: el.select(".media .status").text()
            };
        });
    }

    let genreItems = doc.select("ul.sub-menu.genres a").map(function (el) {
        return {
            name: el.select("h3").text(),
            link: "",
            action: { type: "list", script: "search.js", input: el.attr("href"), data: "" }
        };
    });

    return Response.success([
        {
            id: "banner",
            title: "",
            subtitle: "",
            type: "banner",
            items: bannerItems
        },
        {
            id: "latest",
            title: "Latest Update",
            subtitle: "",
            type: "grid",
            items: latestItems,
            action: { type: "list", script: "search.js", input: "/latest", data: "" }
        },
        {
            id: "new",
            title: "New Manga",
            subtitle: "",
            type: "grid",
            items: newItems,
            action: { type: "list", script: "search.js", input: "/new-manga", data: "" }
        },
        {
            id: "genres",
            title: "Genres",
            subtitle: "",
            type: "chip",
            items: genreItems
        }
    ]);
}
