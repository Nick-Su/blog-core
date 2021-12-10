import React, { useEffect, useState, ReactElement } from 'react';
import { useNavigate } from "react-router-dom";
import { observe, observable } from 'mobx'
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import userSessionStore from '../../services/stores/userSessionStore';
import { isUserAuthenticated } from '../../services/utils/Auth';

const pages = ['posts', 'create', 'About'];

const ResponsiveAppBar = (): ReactElement => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  observe(userSessionStore, 'isLoggedIn', change => {
    setIsLoggedIn(!!(change.newValue))
  })

  useEffect(() => {
    setIsLoggedIn(isUserAuthenticated())
    let rawUserSessionData = sessionStorage.getItem('userSessionData');
    let userSessionData = null;
    userSessionStore.setIsLoggedIn(isUserAuthenticated())

    if (rawUserSessionData) {
      userSessionData = JSON.parse(rawUserSessionData);
    }

    if (userSessionData) {
      userSessionStore.setIsLoggedIn(true)
    }
  }, [])

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleLinkClick = (page: string) => {
    switch (page) {
      case 'posts':
        navigate('/posts/');
        break;
      case 'create':
        navigate('/posts/' + page);
        break;
      default:
        break;
    }
  }

  const handleCloseNavMenu = (e: any): void => {
    setAnchorElNav(null);
  };

  const handleLogin = (): void => {
    navigate('/login')
  }

  const handleLogout = (): void => {
    sessionStorage.removeItem('userSessionData');
    userSessionStore.setIsLoggedIn(false)
  }
  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={(e: any) => handleCloseNavMenu(e)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={(e: any) => handleCloseNavMenu(e)}  >
                  {/* <Typography textAlign="center">{page}</Typography> */}
                  <Link href="#">Link</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleLinkClick(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            { isLoggedIn &&
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Выйти</Typography>
              </MenuItem>
            }

            { !isLoggedIn &&
              <MenuItem onClick={handleLogin}>
                <Typography textAlign="center">Войти</Typography>
              </MenuItem>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;
