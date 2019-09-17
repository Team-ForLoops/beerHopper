const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  // revisit
  items: {
    type: Sequelize.ARRAY(Sequelize.INTEGER) // follow-up
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

// create total price function

module.exports = Order
