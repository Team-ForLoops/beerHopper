const router = require('express').Router()
const {Review, User, Beer} = require('../db/models')
module.exports = router

//api/reviews/beerId
router.get('/:beerId', async (req, res, next) => {
  const beerId = req.params.beerId
  try {
    const reviews = await Review.findAll({
      where: {
        beerId: beerId
      },
      include: {
        model: User
      }
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:beer/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId)
    res.send(review)
  } catch (error) {
    next(error)
  }
})

router.put('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId)
    review.update(req.body)
    res.send(review)
  } catch (error) {
    next(error)
  }
})
