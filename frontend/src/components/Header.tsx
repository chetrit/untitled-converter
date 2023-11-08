// Header.tsx
import * as React from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom' // Import useNavigate hook

import Favorite from 'pages/Favorite/Favorite'
import Selection from 'pages/Selection/Selection'

import logo from '../assets/images/logo.png'

interface HeaderProps {
  user: { name: string, profilePicture: string } | null
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const navigate = useNavigate()

  // Define the navigation functions
  const handleFavoritesClick = () => {
    navigate('/favorite') // For now, navigate to the root
  }

  const handleAllCurrenciesClick = () => {
    navigate('/selection') // For now, navigate to the root
  }

  const handleLogoClick = () => {
    navigate('/') // For now, navigate to the root
  }

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
        <Typography variant={'h6'} component={'div'} sx={{ flexGrow: 1 }}>
          Untitled Converter
        </Typography>
        <Button color={'inherit'} startIcon={<FavoriteBorderIcon/>} onClick={handleFavoritesClick}>
          Favorites
        </Button>
        <Button color={'inherit'} startIcon={<CurrencyExchangeIcon/>} onClick={handleAllCurrenciesClick}>
          All Currencies
        </Button>
        {user
          ? (
            <Avatar alt={user.name} src={user.profilePicture}/>
            )
          : (
            <IconButton color={'inherit'}>
              <AccountCircle/>
            </IconButton>
            )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
