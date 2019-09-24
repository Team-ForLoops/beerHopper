import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <Container>
      <h3>
        Welcome,{' '}
        {email.slice(0, 1).toUpperCase() +
          email.slice(1, email.indexOf('@')) +
          '!'}
      </h3>
      {props.user.isAdmin ? <h4>Welcome Admin!</h4> : ''}
      <h4>Beer Hopper... inspired by Rear Admiral Grace M. Hopper</h4>
      <img src="/images/grace-hopper1.png" className="logo" />
    </Container>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
