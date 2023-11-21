import { expect, it } from '@jest/globals'
import { describe } from 'node:test'
import request from 'supertest'

import { app } from '@config/jestSetup'

void describe('Get rates', () => {
  it('should respond with 200 OK for GET /rates', async () => {
    await request(app).get('/rates').then((response) => {
      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.any(Object))
    })
  })
})

void describe('Historic Rate', () => {
  it('should respond with 200 OK for GET /rates/historicRates/code', async () => {
    await request(app).get('/rates/historicRates/EUR').then((response) => {
      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.any(Object))
    })
  })
})

void describe('Post Rate', () => {
  it('should respond with 200 OK for POST /rates', async () => {
    const payload = {
      // Your payload data goes here
      code: 'testCode',
      rate: 100,
      symbol: 'testSymbol'
    }

    await request(app)
      .post('/rates')
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200)
      })
  })
})

void describe('Delete Rate', () => {
  it('should respond with 200 OK for DELETE /rates/delete/code', async () => {
    await request(app).delete('/rates/delete/testCode').then((response) => {
      expect(response.status).toBe(200)
    })
  })
})

void describe('Post Favorite Rate', () => {
  it('should respond with 200 OK for POST /rates/favorites', async () => {
    const payload = {
      // Your payload data goes here
      currencyCode: 'TEST-CODE',
      email: 'testingmail@mail.com'
    }

    await request(app)
      .post('/rates/favorites')
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200)
      })
  })
})

void describe('Get Favorite Rate', () => {
  it('should respond with 200 OK for GET /rates/favorites/email', async () => {
    await request(app).get('/rates/favorites/testingmail@mail.com').then((response) => {
      expect(response.status).toBe(200)
      // expect a list containing 'TEST-CODE'
      expect(response.body).toEqual(expect.arrayContaining(['TEST-CODE']))
    })
  })
})

void describe('Delete Favorite Rate', () => {
  it('should respond with 200 OK for DELETE /rates/favorites', async () => {
    const payload = {
      // Your payload data goes here
      currencyCode: 'TEST-CODE',
      email: 'testingmail@mail.com'
    }

    await request(app)
      .delete('/rates/favorites')
      .send(payload)
      .then((response) => {
        expect(response.status).toBe(200)
      })
  })
})
