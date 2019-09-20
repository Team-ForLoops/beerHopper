const router = require('express').Router()
const {Order, Beer, User} = require('../db/models')
module.exports = router

// 8080/api/orders/
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: Beer}, {model: User}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
