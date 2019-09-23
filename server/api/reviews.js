const router = require('express').Router()
const {Review, User} = require('../db/models')
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
