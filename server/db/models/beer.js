const Sequelize = require('sequelize')
const db = require('../db')

const Beer = db.define('beer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('ale', 'lager', 'stout')
  },
  ibu: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    }
  },
  color: {
    type: Sequelize.ENUM('light', 'dark', 'red')
  },
  description: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  quantityInv: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.FLOAT
  }
})

module.exports = Beer