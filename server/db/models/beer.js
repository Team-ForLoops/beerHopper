const Sequelize = require('sequelize')
const db = require('../db')
const Review = require('./review')

const Beer = db.define('beer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ibu: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    }
  },
  color: {
    type: Sequelize.ENUM('light', 'dark', 'red', 'brown')
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-beer.jpg'
  },
  quantityInv: {
    type: Sequelize.INTEGER,
    defaultValue: 15
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Beer
