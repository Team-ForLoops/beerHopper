import axios from 'axios'

// ACTION TYPES

const SET_ORDERS = 'SET_ORDERS'

// ACTION CREATORS

export const setOrders = orders => ({
  type: SET_ORDERS,
  orders: orders
})

// DOLLAR HELPER FOR CENTS FIELD

export const toDollars = cents => {
  return `$${(cents / 100).toFixed(2)}`
}

// THUNK CREATORS

export const getOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(setOrders(data))
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

const allOrders = []

export default function(state = allOrders, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
