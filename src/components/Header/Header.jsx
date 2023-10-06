import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Divider, Drawer, Grid, List, ListItem, Toolbar, Typography } from '@mui/material';
import style from "./stylesHeader.module.scss";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useUserContext } from '../../contexts/UserContext/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';



export default function Header() {
  const navigate = useNavigate()
  const { currentUser, handleSignout } = useUserContext();

  const pages = ["Lịch Chiếu", "Cụm Rạp", "Tin Tức", "Ứng Dụng"];
  const [isOpenDrawer, setisOpenDrawer] = useState(false)
  const handleDrawerToggle = () => {
    setisOpenDrawer(!isOpenDrawer);
  }
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div>
      <AppBar position='fixed' color='transparent'>
        <Toolbar className={style.jss1}>
          <Grid container alignItems="center">
            <Grid item xs={6} lg={3}>
              <a href="/">
                <img src="./image/download.png" alt="" className={style.jss2} />
              </a>
            </Grid>
            <Grid container item justifyContent="center" alignItems="center" sx={{ display: { xs: 'none', lg: 'flex' } }} lg={5}>
              {pages.map((page, index) => {
                return (
                  <a className={style.jss3} onClick={() => handleScroll(index)}>
                    <Typography
                      variant="h4"
                      sx={{ fontSize: 14, fontWeight: 500 }}
                    > {page}
                    </Typography>
                  </a>
                )
              })}
            </Grid>

            <Grid item container justifyContent="flex-end" sx={{ display: { xs: 'none', lg: 'flex' } }} lg={4} >
              {currentUser ?
                <a justify="flex-end" className={style.jss4} lg="6" item="true">
                  <img src="./image/avt.jpg" className={style.jss5} />
                  <Typography
                    variant="h3"
                    sx={{ fontSize: 16, fontWeight: 500 }}>{currentUser.hoTen}</Typography>
                </a>
                :
                <a justify="flex-end" className={style.jss4} lg="6" item="true"
                  onClick={() => navigate("/sign-in")}>
                  <AccountCircleIcon className={style.jss5} />
                  <Typography
                    variant="h3"
                    sx={{ fontSize: 16, fontWeight: 500 }}>Đăng Nhập</Typography>
                </a>
              }
              <Divider orientation='vertical' flexItem />
              {currentUser ?
                <a justify="flex-end" className={style.jss4} lg="6" item="true"
                  href='/'>
                  <LogoutIcon className={style.jss5} />
                  <Typography
                    variant="h3"
                    sx={{ fontSize: 16, fontWeight: 500 }}>
                    <a onClick={handleSignout}>Đăng Xuất</a>
                  </Typography>
                </a> :
                <a justify="flex-end" className={style.jss4} lg="6" item="true"
                  href='/sign-up'>
                  <AccountCircleIcon className={style.jss5} />
                  <Typography
                    variant="h3"
                    sx={{ fontSize: 16, fontWeight: 500 }}>
                    Đăng Ký
                  </Typography>
                </a>}
            </Grid>

            <Grid item container justifyContent={{ xs: "flex-end" }} sx={{ display: { xs: 'flex', lg: 'none' } }} xs={6}>
              <MenuIcon fontSize="large"
                sx={{ color: '#fb4226' }}
                className={style.jss6}
                onClick={handleDrawerToggle} />
            </Grid>

            <Drawer
              variant='temporary'
              open={isOpenDrawer}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true
              }}
              sx={{
                display: { xs: 'block', lg: 'none' },
                '& .MuiDrawer-paper': {
                  width: 200,
                  boxSizing: 'border-box',
                },
              }}>

              <List>
                {["Đăng Nhập", "Đăng Ký"].map((page) =>
                (
                  <ListItem sx={{ paddingTop: '15px' }}>
                    <a className={style.jss4}>
                      <AccountCircleIcon className={style.jss5} />
                      <Typography
                        variant="h3"
                        sx={{
                          fontSize: 16,
                          fontWeight: 500,
                          display: 'flex',
                          justifyContent: 'flex-start'
                        }}>{page}</Typography>
                    </a>
                  </ListItem>
                )
                )}
              </List>

              <Divider />

              <List sx={{ flexGrow: 1 }}>
                {pages.map((page) => (
                  <ListItem sx={{ paddingTop: '22px' }}>
                    <a className={style.jss3}><Typography
                      variant="h4"
                      sx={{ fontSize: 14, fontWeight: 500 }}
                    > {page}
                    </Typography></a>
                  </ListItem>
                )
                )}
              </List>
            </Drawer>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar variant='regular' sx={{ position: "relative" }}></Toolbar>
    </div>

  )
}
