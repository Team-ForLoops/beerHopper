const Sequelize = require('sequelize')
const BeerOrder = require('./beerorder')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'delivered', 'cancelled'), //add more status types
    defaultValue: 'open'
  }
})

Order.prototype.subTotal = function() {
  //make this function
}

module.exports = Order
