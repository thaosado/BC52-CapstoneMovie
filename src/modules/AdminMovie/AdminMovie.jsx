import React, { useEffect, useState } from 'react'
import AddMovie from './AddMovie/AddMovie'
import style from './AdminMovieStyle.module.scss'
import { Button, Container, Modal } from '@mui/material'
import { list } from './TableList'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getMovieList } from "../../redux/movieListSlice"
import { useMutation } from '@tanstack/react-query'
import { deleteMovie } from "../../apis/movieAPI"
import Swal from 'sweetalert2'

export default function AdminMovie() {
    const [searchTerm, setSearchTerm] = useState({
        movieName: ""
    })
    const [openModalAddMovie, setopenModalAddMovie] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()

    const dispatch = useDispatch()
    const { data } = useSelector((state) => {
        return state.movieList;
    })

    const totalPages = data.totalPages;
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1)
    let movies = data.items;

    const handleOpenModalAddMovie = () => {
        setopenModalAddMovie(true)
    }
    const handleCloseModalAddMovie = () => {
        setopenModalAddMovie(false)
    }

    const handleChangePage = (page) => {
        searchParams.set("soTrang", page)
        setSearchParams(searchParams)
    }

    useEffect(() => {
        dispatch(getMovieList({}))
        const page = searchParams.get("soTrang");
        dispatch(getMovieList({ page }))

    }, [searchParams])


    //setup button active
    const button = document.getElementById('button')
    let prevButton = null
    button?.addEventListener('click', (e) => {
        const isButton = e.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }

        if (prevButton !== null) {
            prevButton.style.background = "rgba(250, 71, 6, 0.813)"
        }
        e.target.style.background = "red";
        prevButton = e.target;
    })

    const handleDeleteMovieSwal = (movieId) => {
        Swal.fire({
            title: 'Bạn muốn xóa phim?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: `Hủy`,
        }).then((result) => {
            if (result.isConfirmed) {
                handleDeleteMovie(movieId)
            } else if (result.isDenied) {
                return
            }
        })
    }
    const { mutate: handleDeleteMovie } = useMutation({
        mutationFn: (movieId) => deleteMovie(movieId),
        onSuccess: () => {
            Swal.fire(
                'Thành Công!',
                'Đã xóa phim',
                'success'
            )
            dispatch(getMovieList({}));
            navigate("/admin/movies?soTrang=1");
            button.style.backgroundColor = "rgba(250, 71, 6, 0.813)"
        }
    })

    const navigate = useNavigate()
    const handleShowShowtimes = (movieId) => {
        navigate(`/admin/showtimes/${movieId}`)
    }

    const handleChangeSearchTerm = (evt) => {
        setSearchTerm(evt.target.value)
    }


    return (
        <div className={style.jss1}>
            <div style={{ paddingLeft: '10px' }}>
                <div className={style.jss11}>
                    <input className={style.jss12} onChange={handleChangeSearchTerm} type="text" placeholder='Tìm kiếm phim...' />
                </div>
                <div>
                    <button className={style.jss13}
                        onClick={handleOpenModalAddMovie}
                    >Thêm Phim</button>
                </div>
                <Modal
                    open={openModalAddMovie}
                    onClose={handleCloseModalAddMovie}>
                    <AddMovie handleCloseModalAddMovie={handleCloseModalAddMovie} />
                </Modal>
                <div>
                    <table className={style.jss3}>
                        <thead >
                            {list.map((item) => {
                                return <th className={style.jss2} style={{ maxWidth: `${item.width}` }}>{item.text}</th>
                            })}
                        </thead>
                        {movies?.map((movie) => {
                            return (
                                <tbody>
                                    <td>{movie.maPhim}</td>
                                    <td>{movie.tenPhim}</td>
                                    <td style={{ overflowWrap: 'anywhere' }}>{movie.trailer}</td>
                                    <td>{movie.biDanh}</td>
                                    <td><img src={movie.hinhAnh} style={{ width: '100px', height: '100px' }} alt="" /></td>
                                    <td style={{ overflowWrap: 'inherit' }}>{movie.moTa}</td>
                                    <td>
                                        <button className={style.jss5}
                                            onClick={() => {
                                                Swal.fire({
                                                    icon: 'error',
                                                    title: 'Lỗi',
                                                    text: 'Tính năng chưa cập nhật!',
                                                })
                                            }}>Sửa</button>
                                        <button onClick={() => handleDeleteMovieSwal(movie.maPhim)} className={style.jss6}>Xóa</button>
                                        <button onClick={() => handleShowShowtimes(movie.maPhim)} className={style.jss7}>Lịch Chiếu</button>
                                    </td>
                                </tbody>
                            )
                        })}
                    </table>
                    <div id='button' className={style.jss8}>{pages.map((page, index) => {
                        return <Button id={index} className={style.jss9} onClick={() => handleChangePage(page)}>{page}</Button>
                    })}</div>
                </div>
            </div>
        </div>
    )
}
