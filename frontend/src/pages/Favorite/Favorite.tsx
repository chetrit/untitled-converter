import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { colors } from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  InputBase,
  Box
} from '@mui/material'

import { useAuth } from 'components/AuthContext'

import Curve from 'assets/images/curve.png'

const currencyPairs = ['USD-EUR', 'JPY-USD', 'GBP-USD', 'AUD-CAD', 'EUR-THB']

const FavoritesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(new Set<string>())
  const { userEmail } = useAuth() // Récupérer l'email de l'utilisateur connecté

  useEffect(() => {
    console.log('Fetching favorites for:', userEmail)
    if (userEmail) {
      const url = `http://localhost:8080/rates/favorites/${(userEmail)}`
      console.log('URL:', url)
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setFavorites(new Set(data))
        })
        .catch(error => { console.error('Error fetching favorites:', error) })
    }
  }, [userEmail])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const removeFromFavorites = (pair: string) => {
    const updatedFavorites = new Set(favorites)

    if (!userEmail) {
      console.log('User is not logged in')
      return
    }

    const url = 'http://localhost:8080/rates/favorites'
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: userEmail, currencyCode: pair })
    })
      .then(response => {
        if (response.status === 200) {
          console.log(`Removed ${pair} from favorites`)
          updatedFavorites.delete(pair)
          setFavorites(updatedFavorites)
        } else {
          console.log('Error removing from favorites')
        }
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const filteredFavorites = searchQuery
    ? [...favorites].filter((pair) =>
        pair.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [...favorites]

  return (
    <>
      <Box sx={{
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
      <Box sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
      >
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          maxWidth: '1280px',
          width: '100%'
        }}
        >
          {filteredFavorites.map((pair) => (
            <Card sx={{ maxWidth: 345, m: 2 }} key={pair}>
              <Link
              key={pair} to={`/converter/EUR-${pair}`} style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <CardMedia
                component={'img'}
                height={'140'}
                image={Curve}
                alt={'Trading Curve'}
                sx={{
                  filter: 'blur(5px)'
                }}
              />
              </Link>
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant={'h5'} component={'div'}>
                  {pair}
                </Typography>
                <IconButton onClick={() => { removeFromFavorites(pair) }}>
                  <FavoriteIcon/>
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default FavoritesPage
