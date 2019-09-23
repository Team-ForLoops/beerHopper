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
      //get user cart
      let userOrder = await Order.findOrCreate({
        where: {
          userId: userId,
          status: 'open'
        },
        include: {
          model: Beer
        }
      })
      //merging carts
      if (req.session.userInfo) {
        //we have to merge a cart
        let orderToMerge = await Order.findOne({
          where: {
            id: req.session.userInfo.orderId
          },
          include: {
            model: Beer
          }
        })
        console.log(Order.prototype)
        let beersToMerge = await Promise.all(
          orderToMerge.beers.map(beer => Beer.findByPk(beer.id))
        )
        await userOrder[0].addBeers(beersToMerge)
      }
      if (!req.session.userInfo) req.session.userInfo = userInfo
      req.session.userInfo.orderId = userOrder[0].dataValues.id
      let order = userOrder[0]
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
//get cart subTotal
router.get('/subTotal', async (req, res, next) => {
  let orderId = req.session.userInfo.orderId
  try {
    let beerOrders = await BeerOrder.findAll({
      where: {
        orderId: orderId
      }
    })
    let subTotal = 0
    for (let i = 0; i < beerOrders.length; i++) {
      let itemSubtotal = await beerOrders[i].getItemSubTotal()
      subTotal += itemSubtotal
    }
    res.json(subTotal)
  } catch (err) {
    next(err)
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
router.get('/:beerId/cartData', async (req, res, next) => {
  const beerId = req.params.beerId
  try {
    let beerOrder = await BeerOrder.findOne({
      where: {
        beerId: beerId,
        orderId: req.session.userInfo.orderId
      }
    })
    let quantity = beerOrder.quantity
    let itemSubTotal = await beerOrder.getItemSubTotal()
    res.json({
      quantity,
      itemSubTotal
    })
  } catch (err) {
    next(err)
  }
})
router.put('/updateQuantity/:beerId', async (req, res, next) => {
  const beerId = req.params.beerId
  try {
    let beerOrder = await BeerOrder.findOne({
      where: {
        beerId: beerId,
        orderId: req.session.userInfo.orderId
      }
    })
    await beerOrder.update(req.body)
    res.sendStatus(201)
  } catch (err) {
    next(err)
  }
})
//get item subtotal yo
router.post('/subTotal/:beerId', async (req, res, next) => {
  const beerId = +req.params.beerId
  try {
    const beerOrder = BeerOrder.findOne({
      where: {
        beerId: beerId
      }
    })
    const beer = Beer.findOne({
      where: {
        id: beerId
      }
    })
    let quantity = beerOrder.quantity
  } catch (err) {
    next(err)
  }
})
//checkout route
router.post('/checkout', async (req, res, next) => {
  //subTotal is in req.body
  try {
    let currentOrder = await Order.findByPk(req.session.userInfo.orderId)
    const result = await currentOrder.update({
      status: 'processing',
      subTotal: req.body.subTotal
    })
    //update Quantity for beers on Order
    let beerOrders = await BeerOrder.findAll({
      where: {
        orderId: req.session.userInfo.orderId
      }
    })
    await Promise.all(beerOrders.map(beerOrder => beerOrder.updateInv()))
    //create new order for a logged in guest
    let newOrder = []
    console.log(req.user.id)
    if (req.session.passport) {
      newOrder = await Order.create({
        where: {
          status: 'open'
        }
      })
      newOrder.setUser(req.user) //this is the fix I don't know why?
      req.session.userInfo.orderId = newOrder.dataValues.id //might need to change this
    } else {
      //new cart for unauthenicated guest
      newOrder = await Order.create({
        where: {
          status: 'open'
        }
      })
      req.session.userInfo.orderId = newOrder.dataValues.id //might need to change this
    }
    res.json(result)
  } catch (err) {
    next(err)
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
