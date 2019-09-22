import axios from 'axios'

const initialState = 0.0

//action const
const SET_SUBTOTAL = 'SET_SUBTOTAL'

//action creator
export const setSubTotal = () => {
  return {
    type: SET_SUBTOTAL
  }
}

//thunk
export const setSubTotalThunk = priceChange => {
  return dispatch => {
    dispatch(setSubTotal(priceChange))
  }
}

//
const subTotal = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBTOTAL:
      return state
    default:
      return state
  }
}

export default subTotal
