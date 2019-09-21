const Sequelize = require('sequelize')
const db = require('../db')

const BeerOrder = db.define('beer-orders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  itemPrice: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

BeerOrder.prototype.updateQuantity = function(newQuantity) {
  this.quantity = newQuantity
}
// subTotal: {
//   type: Sequelize.FLOAT,
//   set(value) {
//     value = this.quantity * this.itemPrice
//     this.setDataValue('subTotal', value)
//   }
module.exports = BeerOrder
