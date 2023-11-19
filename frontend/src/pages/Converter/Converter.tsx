import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import { Box, CardMedia } from '@mui/material';
import { useParams } from 'react-router-dom';

import Curve from 'assets/images/curve.png';

const CurrencyConverter = () => {
  const { currencyPair = '' } = useParams<{ currencyPair?: string }>();
  const [fromCurrency, toCurrency] = currencyPair.split('-');

  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('http://localhost:8080/rates');
        const data = await response.json();
        console.log('Rates response:', data);
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    fetchRates();
  }, []);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleFromCurrencyChange = () => {
    // You can add logic here to handle changes in the 'From' currency if needed
  };

  const handleToCurrencyChange = () => {
    // You can add logic here to handle changes in the 'To' currency if needed
  };

  const convertCurrency = () => {
    if (!amount || !fromCurrency || !toCurrency || !exchangeRates) {
      // If any required data is missing, don't proceed with conversion
      return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    if (!fromRate || !toRate) {
      console.error('Exchange rates not available for conversion.');
      return;
    }

    const convertedAmountValue = (parseFloat(amount) / fromRate) * toRate;

    // Round the result to 2 decimal places
    const roundedConvertedAmount = Math.round(convertedAmountValue * 100) / 100;

    setConvertedAmount(roundedConvertedAmount.toString());
  };

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
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardMedia
          component={'img'}
          height={'300px'}
          image={Curve}
          alt={'Trading Curve'}
          sx={{
            filter: 'blur(5px)',
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
              readOnly: true,
            }}
          />
          <TextField
            label={'To'}
            value={toCurrency}
            fullWidth
            margin={'normal'}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button variant={'contained'} color={'primary'} onClick={convertCurrency} fullWidth>
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
  );
};

export default CurrencyConverter;
