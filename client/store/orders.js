import axios from 'axios'

//ACTION TYPES
const SET_ORDERS = 'SET_ORDERS'
const SET_USER_ORDERS = 'SET_USER_ORDERS'
const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER'

//ACTION CREATOR

const setOrders = orders => {
  return {
    type: SET_ORDERS,
    orders
  }
}

const setUserOrders = userOrders => {
  return {
    type: SET_USER_ORDERS,
    userOrders
  }
}

const setSingleOrder = singleOrder => {
  return {
    type: SET_SINGLE_ORDER,
    singleOrder
  }
}

//THUNK
export const getOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(setOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

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
    } catch (error) {
      runInNewContext(error)
    }
  }
}

export const getSingleOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/my/${orderId}`)
      dispatch(setSingleOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//REDUCER

export default function(state = [], action) {
  switch (action.type) {
    case SET_USER_ORDERS:
      return action.userOrders
    case SET_ORDERS:
      return action.orders
    case SET_SINGLE_ORDER:
      return action.singleOrder
    default:
      return state
  }
}
