const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'closed') //add more status types
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
})

// create total price function
//create quantity function
module.exports = Order
