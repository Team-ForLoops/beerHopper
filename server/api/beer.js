const router = require('express').Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op
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

// 8080/api/beer/filter
router.get('/filter/:types', async (req, res, next) => {
  try {
    const types = req.params.types.split('+')
    // console.log('body type:  ', req.body.types)
    const categories = await Category.findAll({
      where: {
        type: {
          [Op.or]: types
        }
      },
      include: Beer,
      returning: true
    })
    let beerArray = []
    for (let i = 0; i < types.length; i++) {
      let category = categories[i]
      console.log(`\n\n\n\n${category.beers}\n\n\n\n`)
      beerArray.concat(category.beers)
    }

    // console.log('\n\n\n\n\n\n\n\n\n',a.map(b => b.name))
    // const justBeers = await categories.map(async function (category){
    //   const beers = await category.getBeers()
    //   return beers
    // })

    res.json(beerArray)
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
    const {rating, description} = req.body

    const {id} = req.user

    const beer = await Beer.findByPk(req.params.id)
    // console.log(beer)

    const newReview = await Review.create({rating, description, userId: id})
    newReview.setBeer(beer)

    res.json(newReview)
  } catch (err) {
    next(err)
  }
})
