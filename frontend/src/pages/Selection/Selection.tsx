import React, { useState } from 'react'
import Curve from 'assets/images/curve.png'

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

// Sample data for currency pairs
const currencyPairs = ['USD-EUR', 'JPY-USD', 'GBP-USD', 'AUD-CAD', 'EUR-THB']

const Selection = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const filteredCurrencyPairs = searchQuery
    ? currencyPairs.filter((pair) =>
      pair.toLowerCase().includes(searchQuery)
    )
    : currencyPairs

  return (
    <>
      <AppBar position={'static'}>
        {/* ... AppBar content ... */}
      </AppBar>
      <Box sx={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  borderRadius: 1,
  backgroundColor: 'common.white',
  marginLeft: 0,
  width: '100%',
  height: '50px' // Ajustez selon vos besoins
}}
>
  <SearchIcon sx={{ color: 'inherit' }} /> 
  <InputBase
    placeholder={'Search…'}
    sx={{
      color: 'inherit',
      padding: '8px 8px 8px 0',
      paddingLeft: 'calc(1em + 32px)', // Ajustez selon la taille de l'icône
      width: '50%', // Ajustez selon vos préférences
      // ... rest of your input styles
    }}
    inputProps={{ 'aria-label': 'search' }}
    onChange={handleSearchChange}
  />
</Box>
<Box sx={{ 
  display: 'flex', 
  justifyContent: 'center' 
}}>
  <Box sx={{ 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'flex-start',
    maxWidth: '1280px',
    width: '100%',
  }}>
        {filteredCurrencyPairs.map((pair) => (
          <Card sx={{
            maxWidth: 345,
            m: 2
            // ... rest of your card styles
          }} key={pair}
          >
            <CardMedia
              component={'img'}
              height={'140'}
              image={Curve} // replace with actual image path
              alt={'Trading Curve'}
              sx={{
                filter: 'blur(5px)',
              }}
            />
            <CardContent>
              <Typography variant={'h5'} component={'h2'}>
                {pair}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      </Box>
    </>
  )
}

export default Selection
