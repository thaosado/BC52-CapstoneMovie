import fetcher from "./fetcher";

export async function getTicketRoomList(showstimeId) {
    try {
        const response = await fetcher.get("/QuanLyDatVe/LayDanhSachPhongVe", {
            params: {
                MaLichChieu: showstimeId
            }
        })
        return response.data.content
    } catch (error) {
        throw error.response.data.content
    }
}