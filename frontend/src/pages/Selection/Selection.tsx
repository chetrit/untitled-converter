import React, { useState } from 'react'

import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import SearchIcon from '@mui/icons-material/Search'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Card,
  CardContent,
  CardMedia,
  Box
} from '@mui/material'

import Curve from 'assets/images/curve.png'

// Sample data for currency pairs
const currencyPairs = ['USD-EUR', 'JPY-USD', 'GBP-USD', 'AUD-CAD', 'EUR-THB']

const Selection = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(new Set())

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const addToFavorites = (pair: string) => {
    setFavorites(new Set(favorites).add(pair))
    // call add to favorites endpoint
  }

  const removeFromFavorites = (pair: string) => {
    const newFavorites = new Set(favorites)
    newFavorites.delete(pair)
    setFavorites(newFavorites)
    // call add to favorites endpoint
  }

  const filteredCurrencyPairs = searchQuery
    ? currencyPairs.filter((pair) =>
      pair.toLowerCase().includes(searchQuery)
    )
    : currencyPairs

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
          {filteredCurrencyPairs.map((pair) => (
            <Card sx={{
              maxWidth: 345,
              m: 2
            }} key={pair}
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
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant={'h5'} component={'h2'}>
                  {pair}
                </Typography>
                <IconButton onClick={() => { favorites.has(pair) ? removeFromFavorites(pair) : addToFavorites(pair) }}>
                  {favorites.has(pair) ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default Selection
