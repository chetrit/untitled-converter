// Selection.jsx
import React, { useState } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import { AppBar, Toolbar, InputBase, Card, CardContent, CardMedia, Box, Typography, Snackbar, AlertColor } from '@mui/material'
import { Link } from 'react-router-dom'

import Curve from 'assets/images/curve.png'


import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Sample data for currency pairs
const currencyPairs = ['USD-EUR', 'JPY-USD', 'GBP-USD', 'AUD-CAD', 'EUR-THB', 'VND-EUR', 'HUF-EUR']

const Selection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());

  const [open, setOpen] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const addToFavorites = (pair: string) => {
    setFavorites(new Set(favorites).add(pair));
    setSnackbarMessage(`Added ${pair} to favorites.`);
    setSnackbarSeverity('success');
    setOpen(true);
    // call add to favorites endpoint
  }

  const removeFromFavorites = (pair: string) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(pair);
    setFavorites(newFavorites);
    setSnackbarMessage(`Removed ${pair} from favorites.`);
    setSnackbarSeverity('warning');
    setOpen(true);
    // call add to favorites endpoint
  }

  const filteredCurrencyPairs = searchQuery
    ? currencyPairs.filter((pair) => pair.toLowerCase().includes(searchQuery))
    : currencyPairs

  return (
    <>
      <AppBar position={'static'}>
        {/* ... AppBar content ... */}
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          borderRadius: 1,
          backgroundColor: 'common.white',
          marginLeft: 0,
          width: '100%',
          height: '50px' // Adjust according to your needs
        }}
      >
        <SearchIcon sx={{ color: 'inherit' }}/>
        <InputBase
          placeholder={'Search…'}
          sx={{
            color: 'inherit',
            padding: '8px 8px 8px 0',
            paddingLeft: 'calc(1em + 32px)', // Adjust according to the icon size
            width: '50%' // Adjust according to your preferences
            // ... rest of your input styles
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearchChange}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            maxWidth: '1280px',
            width: '100%'
          }}
        >
          {filteredCurrencyPairs.map((pair) => (
            <Link
              key={pair}
              to={`/converter/${pair}`}

              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  m: 2
                  // ... rest of your card styles
                }}
              >
                <CardMedia
                  component={'img'}
                  height={'140'}
                  image={Curve} // replace with the actual image path
                  alt={'Trading Curve'}
                  sx={{
                    filter: 'blur(5px)'
                  }}
                />
                <CardContent>
                  <Typography variant={'h5'} component={'h2'}>
                    {pair}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Selection
