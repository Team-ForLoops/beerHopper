const Sequelize = require('sequelize')
const db = require('../db')

// join table with beer and users

const Review = db.define('review', {
  Description: {
    type: Sequelize.TEXT
  },
  Rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5
    }
  }
})

// create total price function

module.exports = Review
