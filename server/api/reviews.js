const router = require('express').Router()
const {Review, User, Beer} = require('../db/models')
const {isUser, isAdmin} = require('../checks')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{model: Beer}, {model: User}]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

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

router.get('/:reviewId', async (req, res, next) => {
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

router.delete('/:reviewId', async (req, res, next) => {
  try {
    Review.destroy({
      where: {
        id: req.params.reviewId
      }
    })
    res.sendStatus(204).send(req.params.reviewId)
  } catch (error) {
    next(error)
  }
})
