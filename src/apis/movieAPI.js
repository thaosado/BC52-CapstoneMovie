import fetcher from "./fetcher";

export async function getBanners() {
    try {
        const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
        return response.data.content;
    } catch (error) {
        throw error.response.data.content;
    }
}

export async function getMovies() {
    try {
        const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim", {
            params: {
                maNhom: "GP07",
            }
        })
        return response.data.content
    } catch (error) {
        throw error.response.data.content;
    };
}

export async function getMovieDetails(movieId) {
    try {
        const response = await fetcher.get("/QuanLyPhim/LayThongTinPhim", {
            params: {
                MaPhim: movieId,
            }
        })
        return response.data.content;
    } catch (error) {
        throw error.response.data.content;
    }
}

export async function addMovie(movie) {
    try {
        const response = await fetcher.post("/QuanLyPhim/ThemPhimUploadHinh", movie)
        return response.data?.content
    } catch (error) {
        throw error.response.data?.content
    }
}

export async function deleteMovie(movieId) {
    try {
        const response = await fetcher.delete("/QuanLyPhim/XoaPhim", {
            params: {
                MaPhim: movieId,
            }
        })
        return response.data?.content
    } catch (error) {
        throw error.response.data.content
    }
}

export async function updateMovie(values) {
    try {
        const response = await fetcher.post("/QuanLyPhim/CapNhatPhimUpload", values)
        return response.data?.content
    } catch (error) {
        throw error.response.data.content
    }
}

export async function getMoviesSearch(searchTerm, page) {
    try {
        const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", {
            params: {
                soTrang: page,
                maNhom: "GP07",
                tenPhim: searchTerm,
                soPhanTuTrenTrang: 3,
            }
        })
        return response.data.content;
    } catch (error) {
        throw error.response.data.content
    }
}