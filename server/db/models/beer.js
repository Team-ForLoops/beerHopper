const Sequelize = require('sequelize')
const db = require('../db')
const Review = require('./review')

const Beer = db.define('beer', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Blue Moon Belgian'
  },
  ibu: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 100
    },
    defaultValue: 50
  },
  color: {
    type: Sequelize.ENUM('light', 'dark', 'red', 'brown', 'blonde', 'amber'),
    defaultValue: 'light'
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      'A wheat beer brewed with Valencia orange peel for a subtle sweetness and bright, citrus aroma'
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-beer.jpg'
  },
  quantityInv: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 1147483647
    },
    defaultValue: 15
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 1147483647
    },
    defaultValue: 5000
  }
})

Beer.prototype.averageRating = async function(beerId) {
  try {
    const reviews = await Review.findAll({
      where: {
        beerId: beerId
      }
    })
    const ratingTotal = reviews.reduce((avg = 0, review) => {
      return avg + review.rating
    })
    const averageRating = (ratingTotal / reviews.length).toFixed(1)
    return averageRating
  } catch (err) {
    console.log(err)
  }
}

module.exports = Beer
