import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_CATEGORIES = 'SET_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'

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
const addCategory = category => ({
  type: ADD_CATEGORY,
  category
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

export const postCategory = category => async dispatch => {
  try {
    const {data} = await axios.post('/api/categories', category)
    dispatch(addCategory(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialCategories, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    case ADD_CATEGORY:
      return [...state, action.category]
    default:
      return state
  }
}
