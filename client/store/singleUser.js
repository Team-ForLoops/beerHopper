// single view redux

import axios from 'axios'

// action types

const SET_SINGLE_USER = 'SET_SINGLE_USER'
const UPDATE_USER = 'UPDATE_USER'

// action creators

export const setSingleUser = singleUser => ({
  type: SET_SINGLE_USER,
  singleUser: singleUser
})

export const updateUser = user => ({
  type: UPDATE_USER,
  user: user
})

// thunks

export const fetchSingleUser = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(setSingleUser(data))
  } catch (err) {
    console.log(err)
  }
}

export const updateUserThunk = userUpdate => async dispatch => {
  try {
    const {data} = await axios.put(`/api/users/${userUpdate.id}`, userUpdate)
    console.log('UPDATE USERS TEST', data)
    dispatch(updateUser(data))
  } catch (err) {
    console.log(err)
  }
}

// reducer

const initialState = {}

const singleUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_USER:
      return action.singleUser
    case UPDATE_USER:
      return action.user
    default:
      return state
  }
}

export default singleUserReducer
