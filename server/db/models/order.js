const Sequelize = require('sequelize')
const BeerOrder = require('./beerorder')
const db = require('../db')
const Beer = require('./beer')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'delivered', 'cancelled'), //add more status types
    defaultValue: 'open'
  }
})

Order.prototype.subTotal = async function() {
  let orderBeers = await BeerOrder.findAll({
    where: {
      orderId: this.id
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
