const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  type: {
    type: Sequelize.STRING,
    validate: {
      len: [3, 10]
    }
  }
})

module.exports = Category
