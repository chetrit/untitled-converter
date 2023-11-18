/* eslint-disable @typescript-eslint/no-dynamic-delete */
import bodyParser from 'body-parser'
import express, { type Response, Router } from 'express'
import { promises as fsPromises } from 'fs'
import * as fs from 'fs'
import { type Int32 } from 'typeorm'

import updateFavoriteCurrencies from '@models/account/favoriteCurrency'
const router = Router()

router.use(express.json())

router.use(bodyParser.urlencoded({ extended: false })) // Middleware to parse POST data

router.get('/rates', async (req, res): Promise<void> => {
  /**
 * @swagger
 * /rates:
 *   get:
 *     tags:
 *       - Rates
 *     summary: Get exchange rates
 *     description: Get exchange rates from ratesData.json, as a JSON file with a list of code:rate, and code:symbol pairs.
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             rates:
 *               type: object
 *               additionalProperties:
 *                 type: number
 *                 description: The exchange rate for the currency code.
 *             symbols:
 *               type: object
 *               additionalProperties:
 *                 type: string
 *                 description: The symbol for the currency code.
 *       '500':
 *         description: Internal server error
 */

  try {
    // get symbols from symbolsData.json
    const ratesData = JSON.parse(await fsPromises.readFile('./src/config/ratesData/ratesData.json', 'utf-8'))
    res.status(200).json(ratesData)
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

router.get('/rates/historicRates/:code', async (req, res): Promise<void> => {
  /**
 * @swagger
 * /rates/historicRates/{code}:
 *   get:
 *     tags:
 *       - Rates
 *     summary: get price history
 *     description: get the price history of a currency, given its code.
 *     parameters:
 *       - name: code
 *         type: string
 *         in: path
 *         required: true
 *         description: The code to get price history for.
 *     responses:
 *       '200':
 *         description: Data generated and returned.
 *       '500':
 *         description: Internal server error.
 */

  try {
    // return json file with rates and dates for the given code
    const code: any = req.params.code
    console.log('Received code:', code)

    // generate json file
    const historicRates: any = fs.readFileSync('./src/config/ratesData/historicRates.json', 'utf-8')
    const parsedHistoricRates: any = JSON.parse(historicRates)
    const historicRatesForCode: any = {}
    historicRatesForCode.code = code
    // make a json file where the key is the date and the value is the rate
    for (const date in parsedHistoricRates.dates) {
      if (parsedHistoricRates.dates[date][code]) {
        historicRatesForCode[date] = parsedHistoricRates.dates[date][code]
      }
    }
    res.json(historicRatesForCode)
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

router.delete('/rates/:code', async (req, res): Promise<void> => {
  /**
 * @swagger
 * /rates/{code}:
 *   delete:
 *     tags:
 *       - Rates
 *     summary: Delete exchange rate
 *     description: Delete an exchange rate from ratesData.json and customData.json, given its code.
 *     parameters:
 *       - name: code
 *         type: string
 *         in: path
 *         required: true
 *         description: The exchange rate code to delete.
 *     responses:
 *       '200':
 *         description: Data deleted successfully.
 *       '500':
 *         description: Internal server error.
 */

  try {
    const code: any = req.params.code
    console.log('Received code:', code)

    const ratesData: any = fs.readFileSync('./src/config/ratesData/ratesData.json', 'utf-8')
    const customData: any = fs.readFileSync('./src/config/ratesData/customData.json', 'utf-8')

    const parsedRatesData: any = JSON.parse(ratesData)
    const parsedCustomData: any = JSON.parse(customData)

    // delete from ratesData
    delete parsedRatesData.rates[code]
    delete parsedRatesData.symbols[code]

    // delete from customData
    delete parsedCustomData.rates[code]
    delete parsedCustomData.symbols[code]

    // Save to a file in the same directory
    fs.writeFileSync(
      './src/config/ratesData/ratesData.json',
      JSON.stringify(parsedRatesData, null, 2)
    )

    fs.writeFileSync(
      './src/config/ratesData/customData.json',
      JSON.stringify(parsedCustomData, null, 2)
    )

    res.status(200).json({ message: 'Data deleted successfully' })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

router.post('/rates', async (req, res): Promise<void> => {
  /**
 * @swagger
 * /rates:
 *   post:
 *     tags:
 *       - Rates
 *     summary: Add exchange rate
 *     description: Add an exchange rate to ratesData.json and customData.json, given its code, rate, and symbol.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               description: The code of the currency.
 *             rate:
 *               type: number
 *               description: The rate of the currency.
 *             symbol:
 *               type: string
 *               description: The name of the currency.
 *     responses:
 *       '200':
 *         description: Data saved successfully.
 *       '400':
 *         description: Invalid request body or missing required fields.
 *       '500':
 *         description: Internal server error.
 */

  try {
    const code: string = req.body.code
    const rate: Int32 = req.body.rate
    const symbol: string = req.body.symbol
    console.log('Received code:', code)
    console.log('Received rate:', rate)
    console.log('Received symbol:', symbol)

    if (!(code) || !rate || !symbol) {
      console.log('Missing required data')
      res.status(400).json({ message: 'Missing required data' })
      return
    }

    // write to customData.json
    const customData: any = fs.readFileSync('./src/config/ratesData/customData.json', 'utf-8')
    const parsedCustomData: any = JSON.parse(customData)
    parsedCustomData.rates[code] = rate
    parsedCustomData.symbols[code] = symbol
    fs.writeFileSync(
      './src/config/ratesData/customData.json',
      JSON.stringify(parsedCustomData, null, 2)
    )

    // write to ratesData.json
    const ratesData: any = fs.readFileSync('./src/config/ratesData/ratesData.json', 'utf-8')
    const parsedRatesData: any = JSON.parse(ratesData)
    parsedRatesData.rates[code] = rate
    parsedRatesData.symbols[code] = symbol
    fs.writeFileSync(
      './src/config/ratesData/ratesData.json',
      JSON.stringify(parsedRatesData, null, 2)
    )

    res.status(200).json({ message: 'Data saved successfully' })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
})

// call updateFavoriteCurrencies from favoriteCurrency.ts

router.post('/rates/favorites', async (req, res): Promise<void> => {
  try {
    const favoriteCurrencies: string = req.body.favoriteCurrencies
    console.log('Received favoriteCurrencies:', favoriteCurrencies)
    const email: string = req.body.email

    // call updateFavoriteCurrencies from favoriteCurrency.ts with email and code as parameters
    updateFavoriteCurrencies(email, favoriteCurrencies)
    res.status(200).json({ message: 'Data saved successfully' })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
}
)

export default router
