import axios from 'axios'

//ACTION TYPES
const SET_USER_ORDERS = 'SET_USER_ORDERS'

//ACTION CREATOR

const setUserOrders = userOrders => {
  return {
    type: SET_USER_ORDERS,
    userOrders
  }
}

//THUNK
export const getUserOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}`)
      dispatch(setUserOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getMyOrder = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/my/allOrders')
      dispatch(setUserOrders(data))
      console.log('getting my order', data)
    } catch (error) {
      console.error(error)
    }
  }
}

//Initial State

const orders = []
//REDUCER
export default function(state = orders, action) {
  switch (action.type) {
    case SET_USER_ORDERS:
      return action.userOrders
    default:
      return state
  }
}
