const Sequelize = require('sequelize')
const db = require('../db')

const Beer = db.define('beer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('ale', 'lager', 'stout', 'sour', 'saison')
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
    defaultValue: 1
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Beer
