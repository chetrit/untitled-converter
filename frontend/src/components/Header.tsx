import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/images/logo.png';

interface HeaderProps {
  user: { name: string; profilePicture: string } | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const navigate = useNavigate();

  // Define the navigation functions
  const handleFavoritesClick = () => {
    navigate('/favorite');
  };

  const handleAllCurrenciesClick = () => {
    navigate('/selection');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
          onClick={handleLogoClick}
        >
          <img src={logo} alt="Untitled Converter Logo" style={{ height: '40px' }} />
        </IconButton>
        <Typography variant="h6" component="div" >
          Untitled Converter
        </Typography>
        <Button color="inherit" startIcon={<FavoriteBorderIcon />} onClick={handleFavoritesClick} sx={{ marginLeft: 1 }}>
          Favorites
        </Button>
        <Button color="inherit" startIcon={<CurrencyExchangeIcon />} onClick={handleAllCurrenciesClick}>
          All Currencies
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        {user ? (
          <Avatar alt={user.name} src={user.profilePicture} />
        ) : (
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
