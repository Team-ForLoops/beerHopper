const Sequelize = require('sequelize')
const db = require('../db')

const BeerOrder = db.define('beer-orders', {
  quantity: {
    type: Sequelize.INTEGER
  },
  itemPrice: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

module.exports = BeerOrder
