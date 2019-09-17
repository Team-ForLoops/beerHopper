const Sequelize = require('sequelize')
const db = require('../db')

const BeerType = db.define('beer-type', {
  type: {
    type: Sequelize.ENUM('ale', 'lager', 'stout', 'sour', 'saison')
  }
})

module.exports = BeerType
