const isUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    const error = new Error('You must be logged in to do that!')
    error.status = 401
    return next(error)
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  } else {
    const error = new Error(
      'You must have Administrator privileges to do that!'
    )
    error.status = 401
    return next(error)
  }
}

module.exports = {isUser, isAdmin}
