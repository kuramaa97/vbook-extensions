load('config.js');
function execute() {
    return Response.success([
        { title: "Mới cập nhật", input: "/tim-truyen", script: "search.js" },
        { title: "Truyện mới", input: "/tim-truyen?status=-1&sort=15", script: "search.js" },
        { title: "Đang tiến hành", input: "/tim-truyen?status=1&sort=0", script: "search.js" },
        { title: "Hoàn thành", input: "/tim-truyen?status=2&sort=0", script: "search.js" },
        { title: "Xem nhiều", input: "/tim-truyen?status=-1&sort=13", script: "search.js" }
    ]);
}
