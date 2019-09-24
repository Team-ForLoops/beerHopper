import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBeers} from '../store/allBeers'

import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
  DropdownButton
} from 'react-bootstrap'

class AdminDash extends React.Component {
  render() {
    return (
      <div>
        <ButtonToolbar aria-label="Toolbar with button groups">
          <ButtonGroup className="mr-2" aria-label="First group">
            <Link to="/admin/dashboard">
              <Button variant="outline-info">Admin Home Page</Button>
            </Link>
          </ButtonGroup>

          <ButtonGroup className="mr-2" aria-label="Second group">
            <Link to="/admin/edit/orders">
              <Button variant="outline-info">Admin Order Management</Button>
            </Link>
          </ButtonGroup>

          <ButtonGroup className="mr-2" aria-label="Second group">
            <Link to="/admin/edit/users">
              <Button variant="outline-info">Admin User Management</Button>
            </Link>
          </ButtonGroup>

          <ButtonGroup className="mr-2" aria-label="Second group">
            <Link to="/admin/post/beer">
              <Button variant="outline-info">Create New Product</Button>
            </Link>
          </ButtonGroup>

          <ButtonGroup className="mr-2" aria-label="Second group">
            <Link to="/admin/category">
              <Button variant="outline-info">New Category</Button>
            </Link>
          </ButtonGroup>
        </ButtonToolbar>
        <br />

        {/* <img
          id="dash-image-mock"
          src="https://res.cloudinary.com/dejiqayjc/image/upload/v1569248053/fundus_pics/admindash_part1_kkgphi.png"
        />

        <br />

        <img
          id="dash-image-mock"
          src="https://res.cloudinary.com/dejiqayjc/image/upload/v1569248058/fundus_pics/admindash_part2_ikbsxd.png"
        /> */}

        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>Document</title>
          </head>
          <body>
            <img src="https://res.cloudinary.com/dejiqayjc/image/upload/v1569248053/fundus_pics/admindash_part1_kkgphi.png" />
            <br />
            <br />
            <br />
            <img src="https://res.cloudinary.com/dejiqayjc/image/upload/v1569248058/fundus_pics/admindash_part2_ikbsxd.png" />
          </body>
        </html>
      </div>
    )
  }
}

const mapState = state => {
  return {
    beers: state.allBeers
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     fetchBeers: () => dispatch(getBeers)
//   }
// }

export default connect(mapState)(AdminDash)
