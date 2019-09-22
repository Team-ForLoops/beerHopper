const Sequelize = require('sequelize')
const {BeerOrder} = require('./index')
const db = require('../db')
const Beer = require('./beer')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('open', 'processing', 'delivered', 'cancelled'), //add more status types
    defaultValue: 'open'
  },
  subTotal: {
    type: Sequelize.FLOAT,
    allowNull: true
  }
})

// Order.prototype.updateInv = async function() {
//   let orderId = this.id;
//   console.log(this)
//   try{
//     let beerOrders = await BeerOrder.findAll({
//       where:{
//         orderId: orderId
//       }
//     })
//     console.log(beerOrders)
//   }catch(err){
//     console.log(err)
//   }
//}
//find all beers in the beerOrders array

module.exports = Order
