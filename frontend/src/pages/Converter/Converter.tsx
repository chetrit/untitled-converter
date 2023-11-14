import React, { useState, useEffect } from 'react'

import {
  Container,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography
} from '@material-ui/core'
import { Box, CardMedia } from '@mui/material'
import { useParams } from 'react-router-dom'

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
  },
  {
    value: 'GBP',
    label: 'British pound'
  }
  // ... add other currencies as needed
]

const CurrencyConverter = () => {
  // Use the useParams hook to get the entire currency pair string
  const { currencyPair = '' } = useParams<{ currencyPair?: string }>();

  // Split the currency pair into fromCurrency and toCurrency
  const [fromCurrency, toCurrency] = currencyPair.split('-');

  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');

  useEffect(() => {
    // You can use the values of fromCurrency and toCurrency here
    console.log('From Currency:', fromCurrency)
    console.log('To Currency:', toCurrency)

    // You would use an API call here to get real-time conversion rates
  }, [fromCurrency, toCurrency])

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleFromCurrencyChange = () => {
    // No need to handle changes for 'From' currency in this case
  }

  const handleToCurrencyChange = () => {
    // No need to handle changes for 'To' currency in this case
  }

  const convertCurrency = () => {
    // Here you would call the conversion API to convert the currency
    // and then set the converted amount with setConvertedAmount
  }

  return (
    <Container maxWidth={'lg'}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '100%',
          marginTop: '5%',
          marginBottom: '5%',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}
      >
        <CardMedia
          component={'img'}
          height={'300px'}
          image={Curve}
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
