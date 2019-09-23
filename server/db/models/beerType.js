const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 10],
      isAlpha: true
    }
  }
})

module.exports = Category
