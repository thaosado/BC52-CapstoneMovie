import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserList, deleteUser } from '../../apis/userAPI'
import { Button, Modal, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import style from './AdminUserStyle.module.scss'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUser from './AddUser/AddUser';
import EditIcon from '@mui/icons-material/Edit';
import { useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import UpdateUser from './UpdateUser/UpdateUser';


const columns = [
    { name: 'Tài Khoản', width: 150 },
    { name: 'Mật Khẩu', width: 130 },
    { name: 'Email', width: 130 },
    { name: 'Số ĐT', width: 150 },
    { name: 'Họ Tên', width: 160 },
    { name: 'Mã Loại', width: 120 },
    { name: 'Action', width: 50 },
];

const styleModal = {
    border: 'none',
    backgroundColor: 'tranferant',
    width: '450px',
    height: 'auto',
    top: '5%',
    left: '35%',
};

export default function AdminUser() {
    const [page, setPage] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [item, setItem] = useState({})

    const [openModalAddUser, setOpenModalAddUser] = useState(false);
    const handleOpenAddUser = () => {
        return setOpenModalAddUser(true)
    }
    const handleCloseAddUser = () => {
        return setOpenModalAddUser(false)
    }
    console.log();
    const [openModalUpdateUser, setOpenModalUpdateUser] = useState(false);
    const handleOpenUpdateUser = (item) => {
        setItem(item);
        return setOpenModalUpdateUser(true)
    }
    const handleCloseUpdateUser = () => {
        return setOpenModalUpdateUser(false)
    }

    const { data } = useQuery({
        queryKey: ['getUserList', searchParams.get('soTrang')],
        queryFn: () => getUserList(searchParams.get('soTrang')),

    })

    const { mutate: handleDeleteUser } = useMutation({
        mutationFn: (taiKhoan) => {
            return deleteUser(taiKhoan)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getUserList'] })
        }
    })

    const handleDelete = (taiKhoan) => {
        Swal.fire({
            title: `Bạn muốn xóa tài khoản ${taiKhoan}?`,
            showCancelButton: true,
            cancelButtonText: 'Hủy',
            confirmButtonText: 'Xác nhận',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteUser(taiKhoan);
                Swal.fire('Đã xóa!', '', 'success');
            }
        })
    }

    const queryClient = useQueryClient();
    const totalPages = data?.totalPages;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

    const handleChangePage = (page) => {
        // setPage(page)
        searchParams.set("soTrang", page);
        setSearchParams(searchParams);

    }

    if (!data) {
        return <div><h1>lỗi</h1></div>
    }

    return (
        <div className={style.jss1}>
            <div style={{ display: 'flex', justifyContent: "space-between" }}>
                <div className={style.jss2}>
                    <AddIcon />
                    <Button style={{ color: 'white' }} onClick={handleOpenAddUser}>THÊM NGƯỜI DÙNG</Button>
                </div>
            </div>
            <div style={{ height: "100%", maxWidth: '100%' }}>
                <TableContainer>
                    <Table sx={{ width: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {columns.map((colum) => {
                                    return (
                                        <TableCell key={colum.name} width={colum.width}>{colum.name}</TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.items.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{item.taiKhoan}</TableCell>
                                        <TableCell>{item.matKhau}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.soDt}</TableCell>
                                        <TableCell>{item.hoTen}</TableCell>
                                        <TableCell>{item.maLoaiNguoiDung}</TableCell>
                                        <TableCell>
                                            <a className={style.jss4}
                                                onClick={() => { handleOpenUpdateUser(item) }}>
                                                <EditIcon /> Sửa
                                            </a>
                                            <a className={style.jss5}
                                                onClick={() => { handleDelete(item.taiKhoan) }}>
                                                <DeleteIcon /> Xóa
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}

                        </TableBody>
                    </Table>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ margin: '5px' }}>
                            {pages.map((page, index) => {
                                return <button key={index} className={style.jss6} onClick={() => handleChangePage(page)}>{page}</button>
                            })}
                        </div>
                    </div>
                </TableContainer>
            </div>

            <Modal sx={styleModal} open={openModalAddUser} onClose={handleCloseAddUser}>
                <AddUser handleCloseAddUser={handleCloseAddUser} />
            </Modal>
            <Modal sx={styleModal} open={openModalUpdateUser} onClose={handleCloseUpdateUser}>
                <UpdateUser handleCloseUpdateUser={handleCloseUpdateUser} item={item} />
            </Modal>
        </div>

    )
}
