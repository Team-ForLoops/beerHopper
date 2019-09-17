const Sequelize = require('sequelize')
const BeerOrder = require('./beerorder')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'delivered'), //add more status types
    defaultValue: 'open'
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})

Order.prototype.subTotal = function() {
  //make this function
}

// create total price function
//create quantity function
module.exports = Order
