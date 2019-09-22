import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

//react bootstrap components
import Container from 'react-bootstrap/Container'
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'

const Navbar = ({handleClick, isLoggedIn}) => {
  function handleChange() {}
  function handleSubmit() {}
  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1>BEER HOPPER</h1>
      </Row>
      <NavBar className="justify-content-md-center">
        <span>
          🔎
          <input placeholder="beer..." />
        </span>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
        <div>
          <Link to="/beers">🍺 Beers 🍺</Link>
        </div>
        <div className="justify-content-end">
          <Link to="/cart"> Cart</Link>
        </div>
        {isLoggedIn ? <Link to="/orders/myOrders">My Orders</Link> : ''}
      </NavBar>
      <hr />
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('admin?', !!state.user.isAdmin)
  return {
    isLoggedIn: !!state.user.id
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
  isLoggedIn: PropTypes.bool.isRequired
}
