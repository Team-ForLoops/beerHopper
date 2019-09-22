import axios from 'axios'

//ACTION TYPES
const SET_MY_ORDERS = 'SET_MY_ORDERS'
const SORT_MY_ORDERS = 'SORT_MY_ORDERS'

//ACTION CREATOR

const setMyOrders = myOrders => {
  return {
    type: SET_MY_ORDERS,
    myOrders
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

export const getMyOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders/my/allOrders')
      dispatch(setMyOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

//Sorting Function
export const sortMyOrders = (sortBy, myOrders) => dispatch => {
  try {
    switch (sortBy) {
      case 'dateOld':
        dispatch(
          setMyOrders(
            myOrders.sort((a, b) => {
              return b.createdAt - a.createdAt
            })
          )
        )
        break
      case 'dateNew':
        dispatch(
          setMyOrders(
            myOrders.sort((a, b) => {
              return a.createdAt - b.createdAt
            })
          )
        )
        break
      default:
        return myOrders
    }
  } catch (error) {
    console.error(error)
  }
}
//Initial State
const orders = []

//REDUCER
export default function(state = orders, action) {
  switch (action.type) {
    case SET_MY_ORDERS:
      return action.myOrders
    default:
      return state
  }
}
