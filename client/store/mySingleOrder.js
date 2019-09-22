import axios from 'axios'

//ACTION CONSTANTS
const SET_MY_ORDER = 'SET_MY_ORDER'

//ACTION CREATOR
const setMyOrder = myOrder => {
  return {
    type: SET_MY_ORDER,
    myOrder
  }
}

//THUNK
export const getMyOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/my/${orderId}`)
      dispatch(setMyOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//INITIAL STATE

//REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case SET_MY_ORDER:
      return action.myOrder
    default:
      return state
  }
}
