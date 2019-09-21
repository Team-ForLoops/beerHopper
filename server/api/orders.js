const router = require('express').Router()
const {Order, Beer, User} = require('../db/models')
module.exports = router
const {isUser, isAdmin} = require('../checks')

// 8080/api/orders/
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [{model: Beer}, {model: User}]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// 8080/api/orders/:orderId

router.get('/:orderId', isAdmin, async (req, res, next) => {
  let orderId = req.params.orderId
  try {
    const order = await Order.findByPk(orderId, {
      include: [{model: Beer}, {model: User}]
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

// 8080/api/orders/:orderId

router.put('/:orderId', async (req, res, next) => {
  let orderId = req.params.orderId

  try {
    const order = await Order.findByPk(orderId)
    console.log(
      'req.body ##################################################',
      req.body
    )
    order.update(req.body)
    res.send(order)
  } catch (err) {
    next(err)
  }
})
