const Sequelize = require('sequelize')
const db = require('../db')
const Beer = require('./beer')

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
BeerOrder.prototype.getItemSubTotal = async function() {
  try {
    const beer = await Beer.findByPk(this.beerId)
    let price = beer.price
    let subTotal = price * this.quantity
    return subTotal
  } catch (err) {
    console.log(err)
  }
}

BeerOrder.prototype.updateInv = async function() {
  try {
    const beer = await Beer.findByPk(this.beerId)
    let newQuantity = beer.quantityInv - this.quantity
    await beer.update({quantityInv: newQuantity})
  } catch (err) {
    console.log(err)
  }
}

module.exports = BeerOrder
