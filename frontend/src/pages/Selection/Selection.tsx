import React, { useState, useEffect } from 'react'

import { useAuth } from 'components/AuthContext';

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  InputBase,
  Snackbar
} from '@mui/material'
import Alert from '@mui/material/Alert'
import { Link } from 'react-router-dom'

import Curve from 'assets/images/curve.png' // Replace with the actual path
type SnackbarSeverity = 'error' | 'success' | 'info' | 'warning'

const ExchangeRateList = () => {
  const [rates, setRates] = useState<any>({}) // You can replace 'any' with the correct type
  const [base, setBase] = useState<string>('') // Assuming 'base' is a string
  const { userEmail } = useAuth();

  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(new Set())
  const [open, setOpen] = useState(false)
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>('success')
  const [snackbarMessage, setSnackbarMessage] = useState('')

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('http://localhost:8080/rates')
        const data = await response.json()
        console.log('Rates response:', data)
        setRates(data.rates)
        setBase(data.base)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching rates:', error)
      }
    }

    fetchRates()
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase())
  }

  const addToFavorites = (pair: string) => {
    pair = "EUR-" + pair;
    // console.log('Adding to favorites:', pair);
    if (!userEmail) {
      console.log("User is not logged in");
      return;
    }

    const url = `http://localhost:8080/rates/favorites`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, currencyCode: pair }),
    })
    .then(response => {
      // console.log(response);
      if (response.status === 200) {
        setFavorites(new Set(favorites).add(pair));
        setSnackbarSeverity('success');
        setSnackbarMessage(`Added ${pair} to favorites`);
      } else {
        // Gérer les erreurs
        console.log('Error adding to favorites');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const removeFromFavorites = (pair: string) => {
    const updatedFavorites = new Set(favorites)
    updatedFavorites.delete(pair)
    setFavorites(updatedFavorites)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const renderCurrencyPairs = () => {
    if (loading) {
      return <p>Loading...</p>
    }

    const filteredCurrencyPairs = Object.entries(rates).filter(([currencyCode]) =>
      currencyCode.toLowerCase().includes(searchQuery)
    )

    return (
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          maxWidth: '1280px',
          width: '100%'
        }}
      >
        {filteredCurrencyPairs.map(([pair, base], index) => (
          // <Link
          //   key={pair} to={`/converter/EUR-${pair}`} style={{ textDecoration: 'none', color: 'inherit' }}
          // >
            <Card sx={{ maxWidth: 345, m: 2 }}>
              <CardMedia
                component={'img'}
                height={140}
                image={Curve}
                alt={'Trading Curve'}
                sx={{ filter: 'blur(5px)' }}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography variant={'h5'} component={'h2'}>
                  <>
                    EUR-{pair}
                  </>
                </Typography>
                <IconButton
                  onClick={() => {
                    favorites.has(pair)
                      ? removeFromFavorites(pair)
                      : addToFavorites(pair)
                  }}
                >
                  {favorites.has(pair) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </IconButton>
              </CardContent>
            </Card>
          //</Link>
        ))}
      </Box>
    )
  }

  return (
    <div>
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
          height: '50px'
        }}
      >
        <SearchIcon sx={{ color: 'inherit' }}/>
        <InputBase
          placeholder={'Search…'}
          sx={{
            color: 'inherit',
            padding: '8px 8px 8px 0',
            paddingLeft: 'calc(1em + 32px)',
            width: '50%'
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearchChange}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {renderCurrencyPairs()}
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default ExchangeRateList
