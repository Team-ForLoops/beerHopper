const Sequelize = require('sequelize')
const db = require('../db')
const Review = require('./review')

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
    defaultValue: '/images/default-beer'
  },
  quantityInv: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

Beer.averageRating = async function(beerId) {
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
