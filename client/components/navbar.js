import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import SearchBar from './SearchBar'
import Cart from './Cart'

//react bootstrap components
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => {
  function handleChange() {}
  function handleSubmit() {}

  return (
    <NavBar
      className="navbar justify-content-between py-0 my-3"
      variant="light"
      bg="light"
      sticky="top"
    >
      <NavBar.Brand>
        <h1>BEER HOPPER</h1>
      </NavBar.Brand>

      {isLoggedIn ? (
        <Nav>
          {/* The navbar will show these links after you log in */}

          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </Nav>
      ) : (
        <Nav>
          {/* The navbar will show these links before you log in */}

          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </Nav>
      )}
      <Nav className="flex-grow-3">
        <SearchBar />
        <Link to="/beers">🍺BEER </Link>
      </Nav>

      {/* placeholder: make links only available to admins */}

      {isLoggedIn ? <Link to="/orders/myOrders">My Orders</Link> : ''}

      {isAdmin ? <Link to="/admin/dashboard">Admin Dashboard</Link> : ''}
      <Nav className="dropdown">
        <Link to="/cart">
          {' '}
          <img
            className="navcart"
            src="http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/256/Shopping-bag-icon.png"
          />
          <div className="dropdown-content miniCart">It's a cart</div>
        </Link>
      </Nav>
    </NavBar>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
