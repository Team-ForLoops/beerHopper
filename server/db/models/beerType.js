const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [3, 10],
      unique: true
    }
  }
})

module.exports = Category
