import React, { useState } from 'react'

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
const currencyPairs = ['USD-EUR', 'JPY-USD', 'GBP-USD', 'AUD-CAD']

const Selection = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <AppBar position={'static'}>
        {/* ... your existing AppBar content ... */}
      </AppBar>
      <Box sx={{
        position: 'relative',
        borderRadius: 1,
        backgroundColor: 'common.white',
        marginLeft: 0,
        width: '100%'
        // ... rest of your search styles
      }}
      >
        <Box sx={{
          padding: '0 16px',
          height: '100%',
          position: 'absolute',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        >
          <SearchIcon/>
        </Box>
        <InputBase
          placeholder={'Search…'}
          sx={{
            color: 'inherit',
            padding: '8px 8px 8px 0',
            // vertical padding + font size from searchIcon
            paddingLeft: 'calc(1em + 32px)',
            width: '100%'
            // ... rest of your input styles
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleSearchChange}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {currencyPairs.map((pair) => (
          <Card sx={{
            maxWidth: 345,
            m: 2
            // ... rest of your card styles
          }} key={pair}
          >
            <CardMedia
              component={'img'}
              height={'140'}
              image={'/path-to-blurred-trading-curve.jpg'} // replace with actual image path
              alt={'Trading Curve'}
            />
            <CardContent>
              <Typography variant={'h5'} component={'h2'}>
                {pair}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  )
}

export default Selection
