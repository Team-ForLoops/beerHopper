// single view redux

import axios from 'axios'

// action types

const SET_SINGLE_BEER = 'SET_SINGLE_BEER'

// action creators

export const setSingleBeer = singleBeer => ({
  type: SET_SINGLE_BEER,
  singleBeer: singleBeer
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
