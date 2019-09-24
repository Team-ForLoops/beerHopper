import axios from 'axios'

const initialState = []
//action consts
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_REVIEW = 'ADD_REVIEW'

//action creator
const getReviews = reviews => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}
const addReview = review => {
  return {
    type: ADD_REVIEW,
    review
  }
}

//thunks
export const fetchReviews = beerId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/reviews/${beerId}`)
      dispatch(getReviews(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const postReviewThunk = (beerId, review) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/beer/${beerId}/review`, review)
    dispatch(addReview(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
const reviews = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
export default reviews
