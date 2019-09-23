const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router
const {isUser, isAdmin} = require('../checks')

// 8080/api/users
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'username',
        'email',
        'isAdmin',
        'createdAt',
        'imageUrl'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// 8080/api/users/:userId

router.get('/:userId', isAdmin, async (req, res, next) => {
  let userId = req.params.userId
  try {
    const user = await User.findByPk(userId)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

// 8080/api/users/:userId

router.put('/:userId', isAdmin, async (req, res, next) => {
  let userId = req.params.userId

  try {
    const user = await User.findByPk(userId)
    console.log(
      'req.body ##################################################',
      req.body
    )
    user.update(req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})

// 8080/api/users/:userId

router.delete('/:userId', isAdmin, async (req, res, next) => {
  let userId = req.params.userId

  try {
    await User.destroy({
      where: {
        id: userId
      }
    })
    res.status(204)
  } catch (err) {
    next(err)
  }
})
