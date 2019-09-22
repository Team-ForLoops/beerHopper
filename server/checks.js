const isUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    const error = new Error('You must be logged in to have access to this!')
    error.status = 401
    return next(error)
  }
}

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next()
  } else {
    const error = new Error(
      'You must have Administrator privileges to access this!'
    )
    error.status = 401
    return next(error)
  }
}

const isMeOrAdmin = (req, res, next) => {
  if (req.user.isAdmin || req.user.id === req.params.id) {
    return next()
  } else {
    const error = new Error('You do not have access to this!')
    error.status = 401
    return next(error)
  }
}

module.exports = {isUser, isAdmin, isMeOrAdmin}
