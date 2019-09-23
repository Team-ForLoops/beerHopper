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
  console.log('IN ACTION CREATOr', delUserId)
  return {
    type: DELETE_USER,
    delUserId: delUserId
  }
}

// DOLLAR HELPER FOR CENTS FIELD

// export const toDollars = cents => {
//   return `$${(cents / 100).toFixed(2)}`
// }

// THUNK CREATORS

export const getUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(setUsers(data))
    console.log('getUsersThunk DATA ARRAY', data)
  } catch (err) {
    console.error(err)
  }
}

export const deleteUserThunk = delUserId => async dispatch => {
  try {
    await axios.delete(`/api/users/${delUserId}`)
    console.log('delUSERID', delUserId)
    dispatch(deleteUser(delUserId)) // deleteUserId
  } catch (err) {
    console.error(err)
  }
}

// export const sortBeers = (sortBy, beers) => dispatch => {
//   try {
//     beers = beers.slice()
//     switch (sortBy) {
//       case 'priceHighToLow':
//         dispatch(
//           setBeers(
//             beers.sort((a, b) => {
//               return b.price - a.price
//             })
//           )
//         )
//         break
//       case 'priceLowToHigh':
//         dispatch(
//           setBeers(
//             beers.sort((a, b) => {
//               return a.price - b.price
//             })
//           )
//         )
//         break
//       case 'name':
//         dispatch(
//           setBeers(
//             beers.sort(function(a, b) {
//               var nameA = a.name.toUpperCase() // ignore upper and lowercase
//               var nameB = b.name.toUpperCase() // ignore upper and lowercase
//               if (nameA < nameB) {
//                 return -1
//               }
//               if (nameA > nameB) {
//                 return 1
//               }
//               return 0
//             })
//           )
//         )
//         break
//       default:
//         return beers
//     }
//   } catch (err) {
//     console.error(err)
//   }
// }

// REDUCER

// INITIAL STATE

const allUsers = []

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
