import { expect, it } from '@jest/globals'
import { describe } from 'node:test'
import request from 'supertest'

import { app } from '@config/jestSetup'

void describe('User Routes', () => {
  it('should respond with 200 OK for GET /', async () => {
    await request(app).get('/').then((response) => {
      expect(response.status).toBe(200)
      expect(response.text).toBe('OK')
    })
  })

  it('should respond with 404 Not Found for invalid route', async () => {
    await request(app).get('/nonexistent').then((response) => {
      expect(response.status).toBe(404)
    })
  })
})
