const User = require('./user')
const Beer = require('./beer')
const Order = require('./order')
const Review = require('./review')
const BeerOrder = require('./beerorder')

// associations

User.hasMany(Order)
Order.belongsTo(User)

Beer.belongsToMany(Order, {through: 'beer-orders'})
Order.belongsToMany(Beer, {through: 'beer-orders'})

Beer.hasMany(Review)
Review.belongsTo(Beer)

User.hasMany(Review)
Review.belongsTo(User)

module.exports = {
  User,
  Beer,
  Order,
  Review,
  BeerOrder
}
