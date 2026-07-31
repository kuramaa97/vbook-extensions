load('config.js');
function execute() {
    return Response.success([
        { title: "Latest Update", input: "/latest", script: "search.js" },
        { title: "New Manga", input: "/new-manga", script: "search.js" },
        { title: "Manga Directory", input: "/manga", script: "search.js" }
    ]);
}
