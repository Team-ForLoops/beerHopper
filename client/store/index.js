import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleBeer from './singleBeer'
import singleOrder from './singleOrder'
import singleUser from './singleUser'
import allBeers from './allBeers'
import cart from './cart'
import categories from './categories'
import allOrders from './allOrders'
import allUsers from './allUsers'
import myOrders from './myOrders'
import subTotal from './subTotal'
import reviews from './reviews'
import singleReview from './singleReview'

const reducer = combineReducers({
  user,
  singleBeer,
  singleOrder,
  singleUser,
  allBeers,
  cart,
  categories,
  allOrders,
  allUsers,
  myOrders,
  subTotal,
  reviews,
  singleReview
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
