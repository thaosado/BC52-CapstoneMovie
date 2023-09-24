import React from 'react'
import fetcher from "./fetcher"

export const signin = async (payload) => {
    try {
        const response = await fetcher.post("/QuanLysNguoiDung/DangNhap", payload);
        return response.data?.content;
    } catch (error) {
        throw error.response.data?.content;
    }
}
export const signup = async (payload) => {
    try {
        const response = await fetcher.post("/QuanLysNguoiDung/DangKy", payload);
        return response.data?.content;
    } catch (error) {
        throw error.response.data?.content;
    }
}