import axios from 'axios'
import express from 'express'
import * as fs from 'fs'
import { Int32 } from 'typeorm'

const app = express()

/*
Create bucket to store json files
Store json files in bucket
Every hour call lambda endpoint to update rates, call API and update rates in bucket
Client API calls are given to backend which calls corresponding lambda function:
delete: send call to lambda to delete rate
post: send call to lambda to add custom rate
get: get the rates from bucket
*/

export async function updateRates (ACCESS_KEY, BASE): Promise<void> {
  console.log('Current directory: ' + process.cwd())

  try {
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

    // check if current hours = 12, if so save all current rates to historicRates.json
    const date = new Date()
    const dateString = date.toISOString()
    const hours: number = date.getHours()

    if (hours !== 12) {
      const historicRates: any = fs.readFileSync('./src/config/ratesData/historicRates.json', 'utf-8')
      const parsedHistoricRates: any = JSON.parse(historicRates)

      // add current rates to historicRates with symbol as key and an extra field for the date
      parsedHistoricRates.dates[dateString] = ratesData.rates

      fs.writeFileSync(
        './src/config/ratesData/historicRates.json',
        JSON.stringify(parsedHistoricRates, null, 2)
      )
    }
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
