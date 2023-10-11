import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../../apis/movieAPI';
import { useNavigate } from 'react-router-dom';
import style from './styleShowing.module.scss'
import { Box, Container, Grid, Modal, Typography, Button } from '@mui/material';
import ReactPlayer from 'react-player';


export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: getMovies,
  })
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false)

  return (
    <Container className={style.jss1} id='0'>
      <div>
        <div className={style.carouselItem}>
          <Container maxWidth="md">
            <Grid container spacing={{ xs: 3 }}>
              {data.map((movie) => {
                return (
                  <Grid item xs={12} sm={4} md={3}>
                    <div>
                      <a className={style.jss1}>
                        <Grid xs={12}>
                          <Grid container xs={4} sm={12} style={{ backgroundImage: `url(${movie.hinhAnh})` }} className={style.jss2}>
                            <div className={style.jss6}>
                              <Button className={style.jss7}
                                onClick={handleOpen}>
                                <span>
                                  <img src="./image/buttonvideo.png" alt="" className={style.jss8} />
                                </span>
                              </Button>
                              <Modal open={openModal} onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description">
                                <Box className={style.jss11}>
                                  <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Text in a modal
                                  </Typography>
                                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                  </Typography>
                                </Box>

                              </Modal>
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
                  </Grid>
                )
              })}
            </Grid>
          </Container>
        </div>
      </div>
    </Container >
  )
}
