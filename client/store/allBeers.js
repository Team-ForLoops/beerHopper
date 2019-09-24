import axios from 'axios'
import {setSearchedBeers} from './searchBeers'

/**
 * ACTION TYPES
 */
const SET_BEERS = 'SET_BEERS'
const ADD_BEER = 'ADD_BEER'

/**
 * INITIAL STATE
 */
const allBeers = []

/**
 * ACTION CREATORS
 */
export const setBeers = beers => ({
  type: SET_BEERS,
  beers
})

const addBeer = beer => ({
  type: ADD_BEER,
  beer: beer
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

export const filterBeers = types => async dispatch => {
  try {
    types = types.join('+')
    const {data} = await axios.get(`/api/beer/filter/${types}`)
    dispatch(setSearchedBeers(data))
  } catch (err) {
    console.error(err)
  }
}

export const searchBeers = name => async dispatch => {
  try {
    const {data} = await axios.get(`/api/beer/search?name=${name}`)
    dispatch(setSearchedBeers(data))
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

export const postBeerThunk = newBeer => async dispatch => {
  try {
    const response = await axios.post('/api/beer', newBeer)
    const createdBeer = response.data

    dispatch(addBeer(createdBeer))
  } catch (err) {
    console.log(err)
  }
}

/**
 * REDUCER
 */
export default function(state = allBeers, action) {
  switch (action.type) {
    case SET_BEERS:
      return action.beers
    case ADD_BEER: {
      return [...state, action.beer]
    }
    default:
      return state
  }
}
