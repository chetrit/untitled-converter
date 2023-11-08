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

const currencies = [
  {
    value: 'USD',
    label: 'US Dollar'
  }
  // ... add other currencies as needed
]

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [convertedAmount, setConvertedAmount] = useState('')

  useEffect(() => {
    // You would use an API call here to get real-time conversion rates
  }, [fromCurrency, toCurrency])

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleFromCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromCurrency(event.target.value)
  }

  const handleToCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToCurrency(event.target.value)
  }

  const convertCurrency = () => {
    // Here you would call the conversion API to convert the currency
    // and then set the converted amount with setConvertedAmount
  }

  return (
    <Container maxWidth={'sm'}>
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
            select
            label={'From'}
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
            fullWidth
            margin={'normal'}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label={'To'}
            value={toCurrency}
            onChange={handleToCurrencyChange}
            fullWidth
            margin={'normal'}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
