import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../../apis/movieAPI';
import { useNavigate } from 'react-router-dom';
import style from './ShowingStyle.module.scss'
import { Box, Container, Grid, Modal, Typography, Button } from '@mui/material';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';

export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: getMovies,
  })

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = (trailer) => {
    console.log(trailer);
    return setOpenModal(true)
  }
  const handleClose = () => {
    return setOpenModal(false)
  }

  const styleModalVideo = {
    width: '400px',
    top: '15%',
    left: '20%'
  };

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 4,
    dots: true,
    dotsClass: `${style.dots}`,
  };

  return (
    <Container className={style.jss1} id='0'>
      <div>
        <div className={style.carouselItem}>
          <Container maxWidth="md">
            <Slider {...settings}>
              {data.map((movie) => {
                return (
                  <div>
                    <div style={{ margin: '10px' }}>
                      <a className={style.jss1}>
                        <Grid xs={12}>
                          <Grid container xs={4} sm={12} style={{ backgroundImage: `url(${movie.hinhAnh})` }} className={style.jss2}>
                            <div className={style.jss6}>
                              <Button className={style.jss7}
                                onClick={() => { handleOpen(movie) }}>
                                <span>
                                  <img src="./image/buttonvideo.png" alt="" className={style.jss8} />
                                </span>
                              </Button>
                            </div>
                          </Grid>
                          <Grid container xs={8} sm={12} className={style.jss9}>
                            <div className={style.jss11}>
                              <div className={style.jss3}>
                                <span className={style.jss4}>C18</span>
                                {movie.tenPhim}
                              </div>
                              <div>
                                <h4 className={style.jss5}>{movie.moTa}</h4>
                              </div>
                            </div>
                            <div>
                              <a href={(`/movies/${movie.maPhim}`)} className={style.jss10}>Mua Vé</a>
                            </div>
                          </Grid>
                        </Grid>
                      </a>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </Container>

        </div>
        <Modal sx={styleModalVideo} open={openModal} onClose={handleClose}>
          <div>
            <ReactPlayer url={"https://www.youtube.com/watch?v=Rr5bP7uLnfk&list=RDRr5bP7uLnfk&start_radio=1"} />
          </div>
        </Modal>
      </div>
    </Container >
  )
}
