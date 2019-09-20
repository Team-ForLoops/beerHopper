const router = require('express').Router()
const {Beer, Review, User, Category} = require('../db/models')
module.exports = router

// 8080/api/beer/
router.get('/', async (req, res, next) => {
  try {
    const beers = await Beer.findAll({
      include: Category
    })
    res.json(beers)
  } catch (err) {
    next(err)
  }
})

// 8080/api/beer/:id
router.get('/:beerId', async (req, res, next) => {
  let beerId = req.params.beerId
  try {
    const beer = await Beer.findByPk(beerId, {
      include: [{model: Review, include: {model: User}}]
    })
    res.send(beer)
  } catch (err) {
    next(err)
  }
})

// 8080/api/beer/:id/review
router.post('/:id/review', async (req, res, next) => {
  try {
    // console.log(
    //   'req.user #######################################################################',
    //   req.user
    // )
    // console.log(
    //   'req.body #######################################################################',
    //   req.body
    // )

    const {id} = req.user
    const {rating, description} = req.body

    const beer = await Beer.findByPk(req.params.id)
    // console.log(beer)

    const newReview = await Review.create({rating, description, userId: id})
    newReview.setBeer(beer)

    res.json(newReview)
  } catch (err) {
    next(err)
  }
})

// 8080/api/beer/:beerId

router.put('/:beerId', async (req, res, next) => {
  let beerId = req.params.beerId

  try {
    const beer = await Beer.findByPk(beerId)
    console.log(
      'req.body ##################################################',
      req.body
    )
    beer.update(req.body)
    res.send(beer)
  } catch (err) {
    next(err)
  }
})

// 8080/api/beer/:beerId

// router.delete('/:beerId', async (req, res, next) => {
//   let beerId = req.params.beerId

//   try {
//     await Beer.destroy({
//       wehre: {
//         id: beerId
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// })
