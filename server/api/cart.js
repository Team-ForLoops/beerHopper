const router = require('express').Router()
const {Order, Beer, User, BeerOrder} = require('../db/models')
module.exports = router

//8080/api/cart
router.get('/', async (req, res, next) => {
  //create session data
  const userInfo = {
    sessionId: req.session.id,
    orderId: '',
    userId: ''
  }
  let cart = []
  try {
    //if user is logged in
    if (req.session.passport) {
      let userId = req.session.passport.user
      let result = await Order.findOrCreate({
        where: {
          userId: userId,
          status: 'open'
        },
        include: {
          model: Beer
        }
      })
      if (!req.session.userInfo) req.session.userInfo = userInfo
      req.session.userInfo.orderId = result[0].dataValues.id
      let order = result[0]
      cart = order.beers
    } else {
      //unauthenicated user
      let order = []
      if (!req.session.userInfo) {
        //if order doesn't exist create a new order
        req.session.userInfo = userInfo
        order = await Order.create({
          where: {
            status: 'open'
          }
        })
        req.session.userInfo.orderId = +order.dataValues.id
      } else {
        order = await Order.findOne({
          where: {
            id: req.session.userInfo.orderId
          },
          include: {
            model: Beer
          }
        })
      }
      cart = order.beers
    }
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:beerId', async (req, res, next) => {
  let beerId = +req.params.beerId
  try {
    //get orderId from session.cart and get order that way

    let order = await Order.findOne({
      where: {
        id: req.session.userInfo.orderId
      }
    })
    const beer = await Beer.findByPk(beerId)
    await order.addBeer(beer)
    const newOrder = await Order.findOne({
      where: {
        id: order.id
      },
      include: {
        model: Beer
      }
    })
    res.status(201).send(newOrder.dataValues.beers)
  } catch (error) {
    next(error)
  }
})
router.delete('/:beerId', async (req, res, next) => {
  try {
    console.log('in delete route', req.session)
    await BeerOrder.destroy({
      where: {
        orderId: req.session.userInfo.orderId,
        beerId: req.params.beerId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
