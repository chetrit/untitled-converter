/* eslint-disable @typescript-eslint/no-dynamic-delete */
import bodyParser from 'body-parser'
import express, { type Response, Router } from 'express'
import { promises as fsPromises } from 'fs'
import * as fs from 'fs'
import { type Int32 } from 'typeorm'

import logger, { logApiRequest } from '@middlewares/logging'

const router = Router()

router.use(express.json())

router.use(bodyParser.urlencoded({ extended: false })) // Middleware to parse POST data

router.get('/rates', logApiRequest, async (req, res): Promise<void> => {
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

router.get('/rates/historicRates/:code', logApiRequest, async (req, res): Promise<void> => {
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
    logger.info('Received code:' + code)

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

router.delete('/rates/delete/:code', logApiRequest, async (req, res): Promise<void> => {
  /**
 * @swagger
 * /rates/delete/{code}:
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
    logger.info('Received code:', code)

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

router.post('/rates', logApiRequest, async (req, res): Promise<void> => {
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
    logger.info('Received code:', code)
    logger.info('Received rate:', rate)
    logger.info('Received symbol:', symbol)

    if (!(code) || !rate || !symbol) {
      logger.info('Missing required data')
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

// take a string as input and put that in the favorites.json list belonging to the user based on their id
router.post('/rates/favorites', logApiRequest, async (req, res): Promise<void> => {
  /**
 * @swagger
 * /rates/favorites:
 *   post:
 *     tags:
 *       - Rates
 *     summary: Add favorite currency
 *     description: Add a favorite currency to favorites.json, given its code and the user's email.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The email of the user.
 *             currencyCode:
 *               type: string
 *               description: The code of the currencies as "xxx-yyy".
 *     responses:
 *       '200':
 *         description: Data saved successfully.
 *       '500':
 *         description: Internal server error.
 */

  try {
    const email: string = req.body.email
    const currencyCode: string = req.body.currencyCode
    logger.info('Received email:', email)
    logger.info('Received currencyCode:', currencyCode)
    // get the favorites.json file
    const favorites: any = fs.readFileSync('./src/config/ratesData/favorites.json', 'utf-8')
    const parsedFavorites: any = JSON.parse(favorites)
    let list: string[] = []
    list = parsedFavorites[email]
    if (!list) {
      parsedFavorites[email] = []
      list = parsedFavorites[email]
    }
    list.push(currencyCode)
    parsedFavorites[email] = list
    // write to the file
    fs.writeFileSync(
      './src/config/ratesData/favorites.json',
      JSON.stringify(parsedFavorites, null, 2)
    )
    res.status(200).json({ message: 'Data saved successfully' })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
}
)

router.delete('/rates/favorites', logApiRequest, async (req, res): Promise<void> => {
  /**
 * @swagger
 * /rates/favorites:
 *   delete:
 *     tags:
 *       - Rates
 *     summary: Delete a favorite currency
 *     description: Delete a favorite currency to favorites.json, given its code and the user's email.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The email of the user.
 *             currencyCode:
 *               type: string
 *               description: The code of the currencies as "xxx-yyy".
 *     responses:
 *       '200':
 *         description: Data deleted successfully.
 *       '500':
 *         description: Internal server error.
 */

  try {
    const email: string = req.body.email
    const currencyCode: string = req.body.currencyCode
    // get the favorites.json file
    const favorites: any = fs.readFileSync('./src/config/ratesData/favorites.json', 'utf-8')
    const parsedFavorites: any = JSON.parse(favorites)
    let list = parsedFavorites[email]
    list = list.filter((item: string) => item !== currencyCode)
    parsedFavorites[email] = list
    // write to the file
    fs.writeFileSync(
      './src/config/ratesData/favorites.json',
      JSON.stringify(parsedFavorites, null, 2)
    )
    res.status(200).json({ message: 'Data deleted successfully' })
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
}
)

router.get('/rates/favorites/:email', logApiRequest, async (req, res): Promise<void> => {
  /**
 * @swagger
 * /rates/favorites/{email}}:
 *   get:
 *     tags:
 *       - Rates
 *     summary: Get favorite currencies
 *     description: Get favorite currencies from favorites.json, given the user's email.
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         type: string
 *         description: The email of the user.
 *     responses:
 *       '200':
 *         description: Data generated and returned.
 *       '500':
 *         description: Internal server error.
 */

  try {
    const email: string = req.params.email
    // get the favorites.json file
    const favorites: any = fs.readFileSync('./src/config/ratesData/favorites.json', 'utf-8')
    const parsedFavorites: any = JSON.parse(favorites)
    res.status(200).json(parsedFavorites[email])
  } catch (error: any) {
    console.error(error.message)
    res.status(500).json({ error: error.message })
  }
}
)

export default router
