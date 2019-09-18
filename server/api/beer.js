const router = require('express').Router()
const {Beer, Review} = require('../db/models')
module.exports = router

// 8080/api/beer/
router.get('/', async (req, res, next) => {
  try {
    const beers = await Beer.findAll()
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
      include: [{model: Review}]
    })
    res.send(beer)
  } catch (err) {
    next(err)
  }
})

// 8080/api/beer/:id/review

router.post('/', async (req, res, next) => {
  try {
    const newRobot = await Robot.create(req.body)
    res.json(newRobot)
  } catch (err) {
    next(err)
  }
})
