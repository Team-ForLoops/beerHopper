import axios from 'axios'
//inital state
const initalState = []

//ACTION CONSTANT
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_ITEM = 'DELETE_ITEM'
const CHECKOUT = 'CHECKOUT'
const GET_ITEM_SUBTOTAL = 'GET_ITEM_SUBTOTAL'
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
const getItemSubtotal = subTotal => {
  return {
    type: GET_ITEM_SUBTOTAL,
    subTotal
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
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/cart/${itemDetails.id}`)
      dispatch(addItem(data))
    } catch (err) {
      console.log(err)
    }
  }
}
export const deleteItemThunk = beerId => {
  return async dispatch => {
    try {
      let {data} = await axios.delete(`/api/cart/${beerId}`)
      console.log('data', data)
      dispatch(deleteItem(beerId))
    } catch (err) {
      console.log(err)
    }
  }
}

export const checkoutThunk = () => {
  return async dispatch => {
    try {
      await axios.post('/api/cart/checkout')
      //put in new cart should be empty []?
      dispatch(checkout([]))
    } catch (err) {
      console.log(err)
    }
  }
}

export const getItenSubTotalThunk = beerId => {
  return async dispatch => {}
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
