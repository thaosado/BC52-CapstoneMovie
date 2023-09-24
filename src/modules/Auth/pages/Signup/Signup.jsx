import React from 'react'
import { useForm } from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup"
import {object, string} from "yup"
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../../../apis/userAPI';

const signupSchema = object({
    taiKhoan: string().required("Tài khoản không được để trống"),
    matKhau: string()
        .required("Mật khẩu không được để trống")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Mật khẩu ít nhất 8 ký tự, 1 kí tự hoa, 1 kí tự thường và 1 số"
    ),
    email: string()
        .required("Email không được để trống")
        .email("Email không đúng định dạng"),
    hoTen: string().required("Họ tên không được để trống"),
    soDt: string().required("Số điện thoại không được để trống")
})

export default function Signup(){
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            hoTen: "",
            soDt: "",
        },
        resolver: yupResolver(signupSchema),
    });

    const {mutate: handleSignup} = useMutation({
        mutationFn: (payload) => signup(payload)
    })

    const onSubmit = async (values) => {
        await handleSignup(values);
    }
    const onError = (errors)=>{
        console.log(errors);
    }
    
  return (
    <div>
        <h1>Signup</h1>

        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
                <input placeholder='Tài Khoản' {...register("taiKhoan")} />
                {errors.taiKhoan && <p>{errors.taiKhoan.message}</p>}
            </div>
            <div>
                <input placeholder='Mật khẩu' {...register("matKhau")} />
                {errors.matKhau && <p>{errors.matKhau.message}</p>}
            </div>
            <div>
                <input placeholder='Email' {...register("email")} />
                {errors.matKhau && <p>{errors.email.message}</p>}
            </div>
            <div>
                <input placeholder='Họ Tên' {...register("hoTen")} />
                {errors.matKhau && <p>{errors.hoTen.message}</p>}
            </div>
            <div>
                <input placeholder='Số Điện Thoại' {...register("soDt")} />
                {errors.matKhau && <p>{errors.soDt.message}</p>}
            </div>

            <button type='submit'>Đăng Ký</button>
        </form>
    </div>
  )
}

{/* <TextField
    {...register("taiKhoan", {require: {value: true, message: "lỗi'"}})}
    error={!!errors.taiKhoan}
    helperText={errors.taiKhoan.message}
/> */}