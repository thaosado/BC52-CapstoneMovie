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

export const getUserList = async () => {
    try {
        const response = await fetcher.get("/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang");
        return response.data?.content

    } catch (error) {
        throw error.response.data
    }
}