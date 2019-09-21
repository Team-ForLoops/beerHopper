// single view redux

import axios from 'axios'

// action types

const SET_SINGLE_ORDER = 'SET_SINGLE_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'

// action creators

export const setSingleOrder = singleOrder => ({
  type: SET_SINGLE_ORDER,
  singleOrder: singleOrder
})

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  order: order
})

// thunks

export const fetchSingleOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(setSingleOrder(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateOrderThunk = orderUpdate => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${orderUpdate.id}`, orderUpdate)
    console.log('UPDATE THUNK TEST', data)
    dispatch(updateOrder(data))
  } catch (err) {
    console.log(err)
  }
}

// reducer

const initialState = {}

const singleOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_ORDER:
      return action.singleOrder
    case UPDATE_ORDER:
      return action.order
    default:
      return state
  }
}

export default singleOrderReducer
