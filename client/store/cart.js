import axios from 'axios'
//inital state
const initalState = []

//ACTION CONSTANT
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_ITEM = 'DELETE_ITEM'
const CHECKOUT = 'CHECKOUT'
//ACTION CREATOR
const getCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}
const addItem = newCart => {
  return {
    type: ADD_ITEM,
    newCart
  }
}
const deleteItem = beerId => {
  return {
    type: DELETE_ITEM,
    beerId
  }
}
const checkout = newCart => {
  return {
    type: CHECKOUT,
    newCart
  }
}
//THUNK
export const fetchCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/cart')
      dispatch(getCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const addItemThunk = itemDetails => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/${itemDetails.id}`)
      dispatch(addItem(data))
    } catch (err) {
      console.error(err)
    }
  }
}
export const deleteItemThunk = beerId => {
  return async dispatch => {
    try {
      let {data} = await axios.delete(`/api/cart/${beerId}`)
      dispatch(deleteItem(beerId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const checkoutThunk = subTotal => {
  return async dispatch => {
    try {
      await axios.post('/api/cart/checkout', {subTotal: subTotal})
      //put in new cart should be empty []?
      dispatch(checkout([]))
    } catch (err) {
      console.error(err)
    }
  }
}

//REDUCER
const cart = (state = initalState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_ITEM:
      return action.newCart
    case DELETE_ITEM:
      let arr = state.filter(beer => {
        return beer.id !== action.beerId
      })
      return arr
    case CHECKOUT:
      return action.newCart
    default:
      return state
  }
}

export default cart
