import React, { useState, useEffect } from 'react'

import {
  Container,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography
<<<<<<< Updated upstream

} from '@material-ui/core'
import {
  Box,
  CardMedia
} from '@mui/material'
=======
} from '@material-ui/core'
import { Box, CardMedia } from '@mui/material'
import { useParams } from 'react-router-dom'

import Curve from 'assets/images/curve.png'
>>>>>>> Stashed changes

import Curve from 'assets/images/curve.png'

const currencies = [
  {
    value: 'USD',
    label: 'US Dollar'
  },
  {
    value: 'EUR',
    label: 'Euro'
  },
  {
    value: 'THB',
    label: 'Thai Bath'
  },
  {
    value: 'RON',
    label: 'Romanian Lei'
  },
  {
    value: 'HUF',
    label: 'Hungarian Forint'
  },
  {
    value: 'JPY',
    label: 'Japanese Yen'
  },
  {
    value: 'VND',
    label: 'Đồng Việt Nam'
<<<<<<< Updated upstream
=======
  },
  {
    value: 'GBP',
    label: 'British pound'
>>>>>>> Stashed changes
  }
  // ... add other currencies as needed
]

const CurrencyConverter = () => {
<<<<<<< Updated upstream
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
=======
  // Use the useParams hook to get the currency parameters from the URL
  const { fromCurrency, toCurrency } = useParams<{ fromCurrency: string, toCurrency: string }>()

  const [amount, setAmount] = useState('')
>>>>>>> Stashed changes
  const [convertedAmount, setConvertedAmount] = useState('')

  useEffect(() => {
    // You can use the values of fromCurrency and toCurrency here
    console.log('From Currency:', fromCurrency)
    console.log('To Currency:', toCurrency)

    // You would use an API call here to get real-time conversion rates
  }, [fromCurrency, toCurrency])

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

<<<<<<< Updated upstream
  const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromCurrency(event.target.value)
  }

  const handleToCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToCurrency(event.target.value)
=======
  const handleFromCurrencyChange = () => {
    // No need to handle changes for 'From' currency in this case
  }

  const handleToCurrencyChange = () => {
    // No need to handle changes for 'To' currency in this case
>>>>>>> Stashed changes
  }

  const convertCurrency = () => {
    // Here you would call the conversion API to convert the currency
    // and then set the converted amount with setConvertedAmount
  }

  return (
<<<<<<< Updated upstream

    <Container maxWidth={'lg'}>

=======
    <Container maxWidth={'lg'}>
>>>>>>> Stashed changes
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
<<<<<<< Updated upstream
          width: '100%', // Make it full width
          // border: '2px solid black', // Add border
          marginTop: '5%', // Add margin top
          marginBottom: '5%', // Add margin bottom
          borderradius: '10px',
=======
          width: '100%',
          marginTop: '5%',
          marginBottom: '5%',
          borderRadius: '10px',
>>>>>>> Stashed changes
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <CardMedia
          component={'img'}
          height={'300px'}
<<<<<<< Updated upstream
          image={Curve} // replace with actual image path
=======
          image={Curve}
>>>>>>> Stashed changes
          alt={'Trading Curve'}
          sx={{
            filter: 'blur(5px)'
          }}
        />
      </Box>

      <Card>
        <CardContent>
          <Typography variant={'h5'} component={'h2'} gutterBottom>
            Real-time Currency Converter
          </Typography>

          <TextField
            label={'Amount'}
            value={amount}
            onChange={handleAmountChange}
            fullWidth
            margin={'normal'}
          />
          <TextField
            label={'From'}
            value={fromCurrency}
            fullWidth
            margin={'normal'}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            label={'To'}
            value={toCurrency}
            fullWidth
            margin={'normal'}
            InputProps={{
              readOnly: true
            }}
          />
          <Button
            variant={'contained'}
            color={'primary'}
            onClick={convertCurrency}
            fullWidth
          >
            Convert
          </Button>

          {convertedAmount && (
            <Typography variant={'h6'} component={'p'}>
              Converted Amount: {convertedAmount}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  )
}

export default CurrencyConverter
