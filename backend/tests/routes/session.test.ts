import { expect, it } from '@jest/globals'
import { describe } from 'node:test'
import request from 'supertest'

import { app } from '@config/jestSetup'

void describe('Session route', () => {
  it('should respond with 200 OK for GET /session', async () => {
    await request(app).get('/session').then((response) => {
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('cookie')
    })
  })
})
