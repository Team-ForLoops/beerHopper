const router = require('express').Router()
const {Order, Beer, User, BeerOrder} = require('../db/models')
module.exports = router

//8080/api/cart
router.get('/', async (req, res, next) => {
  try {
    //determine user is logged in
    const cart = {
      sessionId: req.session.id,
      userId: '',
      orderId: '',
      items: []
    }
    req.session.cart = cart

    res.json(req.session)
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
router.post('/:beerId', async (req, res, next) => {
  try {
    //get orderId from session.cart and get order that way
    const cart = await Order.findOne({
      where: {
        status: 'open'
        // userId: req.user.id
      }
    })

    const beer = await Beer.findByPk(req.params.beerId)
    await BeerOrder.findOrCreate({
      where: {
        beerId: beer.id,
        orderId: cart.id
      }
    })
    BeerOrder.update(req.body)
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
