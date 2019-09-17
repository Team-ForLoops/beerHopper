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
