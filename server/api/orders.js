const router = require('express').Router()
const {Order, Beer, User, BeerOrder} = require('../db/models')
const {isUser, isAdmin} = require('../checks')
module.exports = router

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

router.get('/:userId', isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        id: req.params.userId
      }
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/my/allOrders', isUser, async (req, res, next) => {
  try {
    const myOrders = await Order.findAll({
      where: {
        userId: req.user.dataValues.id
      }
    })
    res.json(myOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/my/:orderId', isUser, async (req, res, next) => {
  try {
    const myOrder = await Order.findOne({
      where: {
        id: req.params.orderId
      },
      include: {
        model: Beer
      }
    })
    res.json(myOrder)
  } catch (error) {
    next(error)
  }
})
