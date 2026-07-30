load('config.js');
function execute() {
    return Response.success([
        { title: "Latest Updates", input: "/novelslisting/?st=1", script: "search.js" },
        { title: "Top Rated", input: "/novelslisting/?st=7", script: "search.js" },
        { title: "Completed", input: "/novelslisting/?sts=2", script: "search.js" },
        { title: "New Series", input: "/novelslisting/?st=2", script: "search.js" }
    ]);
}
