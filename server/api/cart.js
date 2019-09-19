const router = require('express').Router()
const {Order, Beer, User, BeerOrder} = require('../db/models')
module.exports = router

//8080/api/cart
router.get('/', async (req, res, next) => {
  //create session data
  const userInfo = {
    sessionId: req.session.id,
    userId: '',
    orderId: ''
  }
  let cart = {}
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
      let order = result[0]
      cart = order.beers
    } else {
      //unauthenicated user
      let order = []
      if (!req.session.userInfo) {
        //if order doesn't exist create a new order
        order = await Order.create({
          where: {
            status: 'open'
          }
        })
        req.session.userInfo.orderId = order.id
        console.log('created order', order)
      } else {
        order = await Order.findOne({
          where: {
            id: req.session.userInfo.orderId
          },
          include: {
            model: Beer
          }
        })
        console.log('found order', order)
      }
      // cart = order[0].beers
    }
    req.session.userInfo = userInfo
    res.json(req.session)
  } catch (error) {
    next(error)
  }
})

router.put('/:beerId', async (req, res, next) => {
  let beerId = +req.params.beerId
  try {
    //get orderId from session.cart and get order that way
    let cart = req.session.cart

    let order = await Order.findOne({
      where: {
        id: cart.orderId
      }
    })
    const beer = await Beer.findByPk(beerId)
    let objBeer = {
      id: beer.id,
      quantity: 1
    }
    cart.items.push(objBeer)
    order.addBeer(beer)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
router.delete('/:beerId', async (req, res, next) => {
  try {
    let cart = req.session.cart
    console.log(cart)
    await BeerOrder.destroy({
      where: {
        orderId: cart.orderId,
        beerId: req.params.beerId
      }
    })
    req.session.cart.items.filter(item => {
      return item.id !== req.params.beerId
    })
    console.log(req.session.cart)
    res.status(204).send(req.session.cart)
  } catch (error) {
    next(error)
  }
})
