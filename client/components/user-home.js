import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>
        Welcome,{' '}
        {email.slice(0, 1).toUpperCase() +
          email.slice(1, email.indexOf('@')) +
          '!'}
      </h3>
      {props.user.isAdmin ? (
        <span>
          Your Admin Links
          <Link to="/beer/dashboard">
            <Button variant="dark">Product Dashboard</Button>
          </Link>
        </span>
      ) : (
        ''
      )}
      <h4>Beer Hopper... inspired by Rear Admiral Grace M. Hopper</h4>
      <img src="/images/grace-hopper1.png" className="logo" />
    </div>
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
