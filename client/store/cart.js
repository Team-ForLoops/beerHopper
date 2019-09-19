import axios from 'axios'
//inital state
const initalState = {}

//ACTION CONSTANT
const GET_CART = 'GET_CART'
const ADD_ITEM = 'ADD_ITEM'
const GET_PRODUCTS = 'GET_PRODUCTS'
const DELETE_ITEM = 'DELETE_ITEM'

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
const deleteItem = newItems => {
  return {
    type: DELETE_ITEM,
    newItems
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
      await axios.put(`/api/cart/${itemDetails.id}`)
      dispatch(addItem(itemDetails))
    } catch (err) {
      console.log(err)
    }
  }
}
export const deleteItemThunk = beerId => {
  return async dispatch => {
    try {
      let {data} = await axios.delete(`/api/cart/${beerId}`)
      let newItems = data.items
      dispatch(deleteItem(newItems))
    } catch (err) {
      console.log(err)
    }
  }
}
//REDUCER
const cart = (state = initalState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_ITEM:
      return {...state, items: [...state.items, action.itemDetails]}
    case DELETE_ITEM:
      return {...state, items: action.items}
    default:
      return state
  }
}

export default cart
