const Sequelize = require('sequelize')
const {BeerOrder} = require('./index')
const db = require('../db')
const Beer = require('./beer')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'delivered', 'cancelled'), //add more status types
    defaultValue: 'open'
  }
})
//deal with it later
Order.prototype.subTotal = async function() {
  const id = this.id
  let orderBeers = await BeerOrder.findAll({
    where: {
      ordedId: id
    }
  })
  console.log('orderBeers', orderBeers)

  let beerPrice = await Promise.all(
    orderBeers.map(beer => {
      beer = Beer.findById(beer.id).price
    })
  )

  let quantity = orderBeers.map(beer => {
    beer = beer.quantity

    for (let i in quantity) {
      subtotal += quantity[i] * beerPrice[i]
    }
    return subtotal
  }) //array of number of beers
}

module.exports = Order
