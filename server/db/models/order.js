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

Order.prototype.subTotal = function() {
  // let subTotal =
}

module.exports = Order
