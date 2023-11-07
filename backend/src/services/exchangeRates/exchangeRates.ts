import axios from 'axios'
import express from 'express'
import * as fs from 'fs'

const app = express()

export async function updateRates (ACCESS_KEY, BASE): Promise<void> {
  console.log('Current directory: ' + process.cwd())

  try {
    // print current directory
    const ratesData: any = await fetchExchangeRates(ACCESS_KEY, BASE)

    const customData: any = fs.readFileSync('./src/config/ratesData/customData.json', 'utf-8')
    const symbolsData: any = fs.readFileSync('./src/config/ratesData/symbolsData.json', 'utf-8')

    ratesData.symbols = JSON.parse(symbolsData).symbols

    // for each code in customData

    const parsedCustomData: any = JSON.parse(customData)

    for (const code in parsedCustomData.rates) {
      if (parsedCustomData.rates) {
        ratesData.rates[code] = parsedCustomData.rates[code]
      }
      if (parsedCustomData.symbols) {
        ratesData.symbols[code] = parsedCustomData.symbols[code]
      }
    }

    // Save to a file in the same directory
    fs.writeFileSync(
      './src/config/ratesData/ratesData.json',
      JSON.stringify(ratesData, null, 2)
    )
    console.log('rates data saved to ratesData.json')
  } catch (error: any) {
    console.error(error.message)
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const fetchExchangeRates = async (ACCESS_KEY, base) => {
  try {
    const response = await axios.get(
      'http://api.exchangeratesapi.io/v1/latest',
      {
        params: {
          access_key: ACCESS_KEY,
          base
        }
      }
    )
    return response.data
  } catch (error: any) {
    console.error(
      'Error fetching rates from API:',
      error.response ? error.response.data : error.message
    )
    throw new Error('Failed to fetch rates from API')
  }
}

module.exports = {
  fetchExchangeRates,
  updateRates
}
