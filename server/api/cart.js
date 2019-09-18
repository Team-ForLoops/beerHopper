const router = require('express').Router()
const {Order, Beer, User, BeerOrder} = require('../db/models')
module.exports = router

//8080/api/cart
router.get('/', async (req, res, next) => {
  try {
    //session id or userid available
    const cart = await Order.findOrCreate({
      where: {
        status: 'open'
      },
      include: {
        model: Beer
      }
    })
    req.session.cart = cart
    if (req.session.counter) {
      req.session.counter++
    } else {
      req.session.counter = 1
    }

    console.log(req.session)
    res.json(req.session)
    // const items = await BeerOrder.findAll({
    //   where: {
    //     orderId: cart.id
    //   }
    // })
    // console.log('here')
    // res.send(items)
  } catch (error) {
    next(error)
  }
})

router.post('/', (req, res) => {
  let cart = req.body
  req.session.cart = cart
  res.json(req.session.cart)
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
    await cart.addBeer(beer)
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
