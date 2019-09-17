const Sequelize = require('sequelize')
const db = require('../db')

const BeerOrder = db.define('beer-orders', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

// create total price function

module.exports = BeerOrder
