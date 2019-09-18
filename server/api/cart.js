const router = require('express').Router()
const {Order, Beer, User, BeerOrder} = require('../db/models')
module.exports = router

//8080/api/cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        status: 'open'
      }
    })

    const items = await BeerOrder.findAll({
      where: {
        orderId: cart.id
      },
      include: {
        model: Beer
      }
    })

    res.send(items)
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
router.put('/:beerId', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        status: 'open'
      }
    })

    const beer = await Beer.findByPk(req.params.beerId)
    await cart.addBeer(beer)
    cart.update(req.body)
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
