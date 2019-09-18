const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  type: {
    type: Sequelize.ENUM('ale', 'lager', 'stout', 'sour', 'saison')
  }
})

module.exports = Category
