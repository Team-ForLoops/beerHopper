import axios from 'axios'

// ACTION TYPES

const SET_USERS = 'SET_USERS'
const DELETE_USER = 'DELETE_USER'

// ACTION CREATORS

export const setUsers = users => ({
  type: SET_USERS,
  users: users
})

export const deleteUser = delUserId => {
  return {
    type: DELETE_USER,
    delUserId: delUserId
  }
}

// THUNK CREATORS

export const getUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(setUsers(data))
  } catch (err) {
    console.error(err)
  }
}

export const deleteUserThunk = delUserId => async dispatch => {
  try {
    let test = await axios.delete(`/api/users/${delUserId}`)
    dispatch(deleteUser(delUserId)) // deleteUserId
  } catch (err) {
    console.error(err)
  }
}

// INITIAL STATE

const allUsers = []

// REDUCER
export default function(state = allUsers, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case DELETE_USER: {
      console.log('IN REDUCER')
      return state.filter(user => {
        return user.id !== action.delUserId
      })
    }
    default:
      return state
  }
}
