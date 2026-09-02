load('config.js');
function execute() {
    return Response.success([
        { title: "Moi cap nhat", input: BASE_URL + "/truyen/?m_orderby=latest", script: "search.js" },
        { title: "Truyen HOT", input: BASE_URL + "/truyen/?m_orderby=trending", script: "search.js" },
        { title: "Hoan thanh", input: BASE_URL + "/truyen/?status=end", script: "search.js" },
        { title: "Pho bien nhat", input: BASE_URL + "/truyen/?m_orderby=views", script: "search.js" }
    ]);
}
