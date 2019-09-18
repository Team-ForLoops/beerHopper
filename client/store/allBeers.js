import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_BEERS = 'SET_BEERS'

/**
 * INITIAL STATE
 */
const allBeers = []

/**
 * ACTION CREATORS
 */
const setBeers = beers => ({
  type: SET_BEERS,
  beers
})

/**
 * DOLLAR HELPER
 */

export const toDollars = cents => {
  return `$${(cents / 100).toFixed(2)}`
}

/**
 * THUNK CREATORS
 */

export const getBeers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/beer')
    dispatch(setBeers(data))
  } catch (err) {
    console.error(err)
  }
}

export const sortBeers = (sortBy, beers) => dispatch => {
  try {
    beers = beers.slice()
    switch (sortBy) {
      case 'priceHighToLow':
        dispatch(
          setBeers(
            beers.sort((a, b) => {
              return b.price - a.price
            })
          )
        )
        break
      case 'priceLowToHigh':
        dispatch(
          setBeers(
            beers.sort((a, b) => {
              return a.price - b.price
            })
          )
        )
        break
      case 'name':
        dispatch(
          setBeers(
            beers.sort(function(a, b) {
              var nameA = a.name.toUpperCase() // ignore upper and lowercase
              var nameB = b.name.toUpperCase() // ignore upper and lowercase
              if (nameA < nameB) {
                return -1
              }
              if (nameA > nameB) {
                return 1
              }
              return 0
            })
          )
        )
        break
      default:
        return beers
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = allBeers, action) {
  switch (action.type) {
    case SET_BEERS:
      return action.beers
    default:
      return state
  }
}
