/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Beer = db.model('beer')

describe('Beer routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/beer/', () => {
    const codysBeer = 'Cody the King'

    beforeEach(() => {
      return Beer.create({
        name: codysBeer
      })
    })

    it('GET /api/beer', async () => {
      const res = await request(app)
        .get('/api/beer')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(codysBeer)
    })
    it('POST /api/beer', async () => {
      const res = await request(app)
        .post('/api/beer')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('Blue Moon Belgian')
      expect(
        res.body.quantityInv,
        'The default quantity should be set to 15'
      ).to.equal(15)
    })
  })
})
