import React from 'react'
import fetcher from "./fetcher"

export const signin = async (payload) => {
    try {
        const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
        return response.data?.content;
    } catch (error) {
        throw error.response.data?.content;
    }
}
export const signup = async (payload) => {
    try {
        const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
        return response.data?.content;
    } catch (error) {
        throw error.response.data?.content;
    }
}

export const getUserList = async (page) => {
    try {
        const response = await fetcher.get("/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang", {
            params: {
                soTrang: page,
                MaNhom: "GP07",
                soPhanTuTrenTrang: 3,
            }
        });
        return response.data?.content

    } catch (error) {
        throw error.response.data
    }
}
export const addUser = async (payload) => {
    try {
        const response = await fetcher.post("/QuanLyNguoiDung/ThemNguoiDung", payload);
        return response.data.content;
    } catch (error) {
        throw error.response.data
    }
}
export const deleteUser = async (taiKhoan) => {
    try {
        const response = await fetcher.delete("/QuanLyNguoiDung/XoaNguoiDung", {
            params: {
                TaiKhoan: taiKhoan
            }
        })
    } catch (error) {
        throw error.response.data
    }
}

export const updateUser = async (taiKhoan) => {
    try {
        const response = await fetcher.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", taiKhoan)

    } catch (error) {
        throw error.response.data
    }
}