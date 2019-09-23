import axios from 'axios'

const initialState = 0

//action const
const SET_SUBTOTAL = 'SET_SUBTOTAL'
const CLEAR_SUBTOTAL = 'CLEAR_SUBTOTAL'
const UPDATE_SUBTOTAL = 'UPDATE_SUBTOTAL'

//action creator
export const setSubTotal = subTotal => {
  return {
    type: SET_SUBTOTAL,
    subTotal
  }
}
export const clearSubTotal = () => {
  return {
    type: CLEAR_SUBTOTAL,
    newSubTotal: 0
  }
}
export const updateSubTotal = newSubTotal => {
  return {
    type: UPDATE_SUBTOTAL,
    newSubTotal
  }
}
//thunk
export const setSubTotalThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/cart/subTotal')
    dispatch(setSubTotal(data))
  }
}

//
const subTotal = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBTOTAL:
      return action.subTotal
    case CLEAR_SUBTOTAL:
      return action.newSubTotal
    case UPDATE_SUBTOTAL:
      return state + action.newSubTotal
    default:
      return state
  }
}

export default subTotal
