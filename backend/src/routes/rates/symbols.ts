import axios from 'axios'
import bodyParser from 'body-parser'
import express from 'express'
import { promises as fs } from 'fs'

const BASE = 'EUR'
const ACCESS_KEY = '6e2ab2c20f56be76dd517965ae79d25d'

const router = express.Router()

const fetchExchangeSymbols = async (ACCESS_KEY: string, base: string): Promise<any> => {
  try {
    const response = await axios.get('http://api.exchangeratesapi.io/v1/symbols', {
      params: {
        access_key: ACCESS_KEY
      }
    })
    return response.data
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    console.error('Error fetching rates from API:', error.response ? error.response.data : error.message)
    throw new Error('Failed to fetch rates from API')
  }
}

router.get('/', async (req, res) => {
  try {
    const symbolsData = await fetchExchangeSymbols(ACCESS_KEY, BASE)

    // Save to a file in the same directory
    await fs.writeFile('@routes/rates/symbolsData.json', JSON.stringify(symbolsData, null, 2))
    console.log('rates data saved to symbolsData.json')

    res.json(symbolsData)
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
