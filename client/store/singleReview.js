// single view redux

import axios from 'axios'

// action types

const SET_SINGLE_REVIEW = 'SET_SINGLE_REVIEW'
const UPDATE_REVIEW = 'UPDATE_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

// action creators

export const setSingleReview = review => ({
  type: SET_SINGLE_REVIEW,
  review
})

export const updateReview = review => ({
  type: UPDATE_REVIEW,
  review
})

export const deleteReview = reviewId => {
  console.log('IN HERE', reviewId)
  return {
    type: DELETE_REVIEW,
    reviewId
  }
}

// thunks

export const fetchSingleReview = reviewId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/reviews/${reviewId}`)
    dispatch(setSingleReview(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateReviewThunk = reviewUpdate => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/reviews/${reviewUpdate.id}`,
      reviewUpdate
    )
    dispatch(updateReview(data))
  } catch (err) {
    console.log(err)
  }
}

export const removeReview = reviewId => async dispatch => {
  try {
    await axios.delete(`/api/reviews/${reviewId}`)
    dispatch(deleteReview(reviewId))
  } catch (error) {
    console.error(error)
  }
}

// reducer

const initialState = {}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_REVIEW:
      return action.review
    case UPDATE_REVIEW:
      return action.review
    case DELETE_REVIEW:
      return state
    default:
      return state
  }
}
