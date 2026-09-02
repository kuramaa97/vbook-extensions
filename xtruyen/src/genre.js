load('config.js');
function execute() {
    return Response.success([
        { title: "Tien Hiep", input: BASE_URL + "/theloai/tien-hiep/", script: "search.js" },
        { title: "Kiem Hiep", input: BASE_URL + "/theloai/kiem-hiep/", script: "search.js" },
        { title: "Ngon Tinh", input: BASE_URL + "/theloai/ngon-tinh/", script: "search.js" },
        { title: "Dam My", input: BASE_URL + "/theloai/dam-my/", script: "search.js" },
        { title: "Do Thi", input: BASE_URL + "/theloai/do-thi/", script: "search.js" },
        { title: "Huyen Huyen", input: BASE_URL + "/theloai/huyen-huyen/", script: "search.js" },
        { title: "Xuyen Khong", input: BASE_URL + "/theloai/xuyen-khong/", script: "search.js" },
        { title: "Xuyen Nhanh", input: BASE_URL + "/theloai/xuyen-nhanh/", script: "search.js" },
        { title: "Trong Sinh", input: BASE_URL + "/theloai/trong-sinh/", script: "search.js" },
        { title: "Co Dai", input: BASE_URL + "/theloai/co-dai/", script: "search.js" },
        { title: "He Thong", input: BASE_URL + "/theloai/he-thong/", script: "search.js" },
        { title: "Linh Di", input: BASE_URL + "/theloai/linh-di/", script: "search.js" },
        { title: "Trinh Tham", input: BASE_URL + "/theloai/trinh-tham/", script: "search.js" },
        { title: "Light Novel", input: BASE_URL + "/theloai/light-novel/", script: "search.js" },
        { title: "Khac", input: BASE_URL + "/theloai/khac/", script: "search.js" }
    ]);
}
