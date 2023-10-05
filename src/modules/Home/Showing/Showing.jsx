import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../../../apis/movieAPI';
import { useNavigate } from 'react-router-dom';
import style from './styleShowing.module.scss'
import { Container, Grid } from '@mui/material';


export default function Showing() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["movie"],
    queryFn: getMovies,
  })
  const navigate = useNavigate();

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
                      <a href="" className={style.jss1}>
                        <Grid xs={12}>
                          <Grid container xs={4} sm={12} style={{ backgroundImage: `url(${movie.hinhAnh})` }} className={style.jss2}>
                            <div className={style.jss6}>
                              <button className={style.jss7}>
                                <span>
                                  <img src="./image/buttonvideo.png" alt="" className={style.jss8} />
                                </span>
                              </button>
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
