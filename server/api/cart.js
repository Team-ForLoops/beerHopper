const router = require('express').Router()
const {Order, Beer, User, BeerOrder} = require('../db/models')
module.exports = router

//8080/api/cart
router.get('/', async (req, res, next) => {
  try {
    //determine user is logged in
    let cart = {}
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
      cart = {
        sessionId: req.session.id,
        userId: userId,
        orderId: order.id,
        items: order.beers
      }
    } else {
      cart = {
        sessionId: req.session.id,
        userId: '',
        orderId: '',
        items: []
      }
    }
    req.session.cart = cart

    res.json(req.session.cart)
  } catch (error) {
    next(error)
  }
})

//
// router.post('/', async (req, res, next) => {
// 	try {
// 		const cart = await Order.findOne({
// 			where: {
// 				status: 'open'
// 			}
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// });

//Updates cart
//think about when a user goes to the single beer page and tries to a beer to the cart
//post is create, put is update
router.put('/:beerId', async (req, res, next) => {
  try {
    //get orderId from session.cart and get order that way
    let cart = req.session.cart

    let order = await Order.findOne({
      where: {
        id: cart.orderId
      }
    })
    const beer = await Beer.findByPk(req.params.beerId)
    cart.items.push(beer)

    order.addBeer(beer)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    await Order.destroy({
      where: {
        status: 'open'
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
