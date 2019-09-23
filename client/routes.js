import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SingleBeer,
  UpdateBeer,
  AllOrders,
  AllUsers,
  AddBeer,
  AdminDash
} from './components'
import {me} from './store'
import {fetchCart} from './store/cart'

import AllBeers from './components/AllBeers'
import Cart from './components/Cart'
import OrderHistory from './components/OrderHistory'
import {getBeers} from './store/allBeers'
import {getCategories} from './store/categories'
import {getOrders} from './store/allOrders'
import {getUsers} from './store/allUsers'
import {getMyOrders} from './store/myOrders'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchInitialBeers()
    this.props.fetchInitialOrders()
    this.props.fetchCart()
    this.props.fetchCategories()
    this.props.fetchMyOrders()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/beers" component={AllBeers} />
        <Route path="/beer/:beerId" component={SingleBeer} />
        <Route path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {/* Create Admin section and move there later ... testing here for now */}
            <Route path="/admin/dashboard" component={AdminDash} />
            <Route path="/admin/edit/orders" component={AllOrders} />
            <Route path="/admin/edit/users" component={AllUsers} />
            <Route path="/admin/post/beer" component={AddBeer} />
            <Route path="/admin/edit/beer/:beerId" component={UpdateBeer} />
            <Route
              exact
              path="/orders/myOrders"
              component={OrderHistory}
            />{' '}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchInitialBeers: () => dispatch(getBeers()),
    fetchInitialOrders: () => dispatch(getOrders()),
    fetchInitialUsers: () => dispatch(getUsers()),
    fetchCart: () => dispatch(fetchCart()),
    fetchCategories: () => dispatch(getCategories()),
    fetchMyOrders: () => dispatch(getMyOrders())
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
