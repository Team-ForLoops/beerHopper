import axios from 'axios'

// ACTION TYPES

const SET_USERS = 'SET_USERS'

// ACTION CREATORS

export const setUsers = users => ({
  type: SET_USERS,
  users: users
})

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
    default:
      return state
  }
}
