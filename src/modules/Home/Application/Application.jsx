import React from 'react'
import style from './ApplicationStyle.module.scss'
import { Container, Grid } from '@mui/material'

export default function Application() {
    return (
        <div className={style.jss1} >
            <Container maxWidth="md" id="3">
                <Grid container spacing={{ xs: 4 }}>
                    <Grid item xs={12} md={6} style={{ color: "#fff" }}>
                        <p className={style.jss2}>Ứng dụng tiện lợi dành cho</p>
                        <p className={style.jss2}>người yêu điện ảnh</p>
                        <p className={style.jss3}>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                        <a type='button' className={style.jss4}>APP MIỄN PHÍ - TẢI VỀ NGAY</a>
                        <p className={style.jss3}>TIX có hai phiên bảnIOS&Android</p>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <img src="./image/phone.png" alt="" className={style.jss5} />
                        <div>

                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
