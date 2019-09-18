// single view redux

import axios from 'axios'

// action types

const SET_SINGLE_BEER = 'SET_SINGLE_BEER'
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

// reducer

const initialState = {}

const singleBeerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_BEER:
      return action.singleBeer
    default:
      return state
  }
}

export default singleBeerReducer
