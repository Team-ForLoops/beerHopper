import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CATEGORIES = 'SET_CATEGORIES'

/**
 * INITIAL STATE
 */
const initialCategories = []

/**
 * ACTION CREATORS
 */
const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})

/**
 * THUNK CREATORS
 */
export const getCategories = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/categories')
    dispatch(setCategories(data))
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

/**
 * REDUCER
 */
export default function(state = initialCategories, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
