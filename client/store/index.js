import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import singleBeer from './singleBeer'
import singleOrder from './singleOrder'
import allBeers from './allBeers'
import cart from './cart'
import categories from './categories'
import allOrders from './allOrders'
import allUsers from './allUsers'

const reducer = combineReducers({
  user,
  singleBeer,
  singleOrder,
  allBeers,
  cart,
  categories,
  allOrders,
  allUsers
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
