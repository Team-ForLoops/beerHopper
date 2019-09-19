import axios from 'axios'
//inital state
const initalState = {}

//ACTION CONSTANT
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const GET_PRODUCTS = 'GET_PRODUCTS'

//ACTION CREATOR
const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}
const addItem = itemDetails => {
  return {
    type: ADD_ITEM,
    itemDetails
  }
}

//THUNK
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const addItemThunk = itemDetails => {
  return dispatch => {
    dispatch(addItem(itemDetails))
  }
}
//REDUCER
const cart = (state = initalState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_ITEM:
      return {...state, items: [...state.items, action.itemDetails]}
    default:
      return state
  }
}

export default cart
