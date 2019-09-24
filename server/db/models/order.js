const Sequelize = require('sequelize')
const {BeerOrder} = require('./index')
const db = require('../db')
const Beer = require('./beer')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'delivered', 'cancelled'), //add more status types
    defaultValue: 'open'
  },
  subTotal: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

module.exports = Order
