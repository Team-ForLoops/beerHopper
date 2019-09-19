// single view redux

import axios from 'axios'

// action types

const SET_SINGLE_BEER = 'SET_SINGLE_BEER'
const UPDATE_BEER = 'UPDATE_BEER'
//const ADD_TO_CART = 'ADD_TO_CART'
const ADD_REVIEW = 'ADD_REVIEW'

// action creators

export const setSingleBeer = singleBeer => ({
  type: SET_SINGLE_BEER,
  singleBeer: singleBeer
})

export const addReview = (beerId, review) => ({
  type: ADD_REVIEW,
  review: review,
  beerId: beerId
})

export const updateBeer = beer => ({
  type: UPDATE_BEER,
  beer: beer
})

// thunks

export const fetchSingleBeer = beerId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/beer/${beerId}`)
    dispatch(setSingleBeer(data))
  } catch (err) {
    console.log(err)
  }
}

export const postReviewThunk = (beerId, review) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/beer/${beerId}/review`, review)
    dispatch(addReview(beerId, data))
  } catch (err) {
    console.log(err)
  }
}

export const updateBeerThunk = beerUpdate => async dispatch => {
  try {
    const {data} = await axios.put(`/api/beer/${beerUpdate.id}`, beerUpdate)
    dispatch(updateBeer(data))
  } catch (err) {
    console.log(err)
  }
}

// reducer

const initialState = {}

const singleBeerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_BEER:
      return action.singleBeer
    case UPDATE_BEER:
      return action.beer
    default:
      return state
  }
}

export default singleBeerReducer
