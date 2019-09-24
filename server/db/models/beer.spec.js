/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Beer = db.model('beer')

describe('Beer model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Sequelize validations', () => {
    describe('pass with correct types', () => {
      let paleAle

      beforeEach(async () => {
        paleAle = await Beer.create({
          name: 'Winner Pale Ale',
          ibu: 85,
          color: 'light',
          description:
            'holla for a dollsdfsdfsdfdasfsdgadfgafdgafdgadgdagfgadfgadfgsdfsfsdfsdfsdfadfadsfsdfadsfdfsdfa',
          quantityInv: 3,
          price: 3399
        })
      })

      it('has a string name field', () => {
        expect(paleAle.name).to.equal('Winner Pale Ale')
      })
      it('has an integer ibu field', () => {
        expect(paleAle.ibu).to.equal(85)
      })
      it('has 6 options for color: light, dark, red, brown, blonde, amber', () => {
        expect(['light', 'dark', 'red', 'brown', 'blonde', 'amber']).to.include(
          paleAle.color
        )
      })
      it('has a long description field', () => {
        expect(paleAle.description.length).to.equal(94)
      })
      it('has an imageUrl field with a default value', () => {
        expect(paleAle.imageUrl).to.not.be.a('null')
      })
      it('has a quantity iventory field that accepts only integers', () => {
        expect(paleAle.quantityInv).to.equal(3)
      })
      it('has a price field that accepts only integers', () => {
        expect(paleAle.price).to.be.a('number')
      })
    })
  })
})
