const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

// 8080/api/users
router.get('/', async (req, res, next) => {
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
