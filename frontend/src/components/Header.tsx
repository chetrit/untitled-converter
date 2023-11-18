import * as React from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'components/AuthContext';


import logo from '../assets/images/logo.png'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) {
    return null;
  }

  const handleFavoritesClick = () => {
    navigate('/favorite')
  }

  const handleAllCurrenciesClick = () => {
    navigate('/selection')
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleLogout = () => {
    logout();
    navigate('/sign-in');
  };

  return (
    <AppBar position={'static'}>
      <Toolbar>
        <IconButton
          edge={'start'}
          color={'inherit'}
          aria-label={'logo'}
          sx={{ mr: 2 }}
          onClick={handleLogoClick}
        >
          <img src={logo} alt={'Untitled Converter Logo'} style={{ height: '40px' }}/>
        </IconButton>
        <Typography variant={'h6'} component={'div'}>
          Untitled Converter
        </Typography>
        <Button color={'inherit'} startIcon={<FavoriteBorderIcon/>} onClick={handleFavoritesClick} sx={{ marginLeft: 1 }}>
          Favorites
        </Button>
        <Button color={'inherit'} startIcon={<CurrencyExchangeIcon/>} onClick={handleAllCurrenciesClick}>
          All Currencies
        </Button>
        <Box sx={{ flexGrow: 1 }}/>
        <button onClick={handleLogout}>Logout</button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
