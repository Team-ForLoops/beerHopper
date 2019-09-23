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
    // console.log('before beer......', this.props.beers)
    // const beers = this.props.beers
    // console.log('beer variable......', beers)

    return (
      <div>
        {/* <div>
          <h2>Product Dashboard</h2>
          <ul>
            {beers === undefined || beers.length === 0
              ? 'No beer in inventory'
              : beers.map(beer => {
                  return (
                    <li key={beer.id}>
                      <img className="image" src={beer.imageUrl} />
                      <p>Name: {beer.name}</p>
                      <p>Price: {beer.price}</p>
                      <p>Amount in stock: {beer.quantity}</p>
                      <Link to={`/beer/${beer.id}/edit}`}>
                        <button
                          type="button"
                          className="edit"
                          onClick={() => editBeer(beer.id)}
                        >
                          Edit
                        </button>
                      </Link>
                    </li>
                  )
                })}
          </ul>
        </div>
              */}

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
            <Link to="/admin/edit/beer/3">
              <Button variant="outline-info">Edit Existing Product</Button>
            </Link>
          </ButtonGroup>

          <ButtonGroup aria-label="Third group">
            <DropdownButton
              variant="outline-info"
              as={ButtonGroup}
              title="Admin Product Management"
              id="bg-nested-dropdown"
            >
              <Link to="/admin/post/beer">
                <Dropdown.Item eventKey="1">Create New Product</Dropdown.Item>
              </Link>

              <Link to="/admin/edit/beer/3">
                <Dropdown.Item eventKey="2">
                  Update Existing Product
                </Dropdown.Item>
              </Link>
            </DropdownButton>
          </ButtonGroup>
        </ButtonToolbar>
        <br />
        <img
          id="dash-image-mock"
          src="https://res.cloudinary.com/dejiqayjc/image/upload/v1569248053/fundus_pics/admindash_part1_kkgphi.png"
        />

        <br />

        <img
          id="dash-image-mock"
          src="https://res.cloudinary.com/dejiqayjc/image/upload/v1569248058/fundus_pics/admindash_part2_ikbsxd.png"
          // height="1000px"
          // width="1000px"
        />
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
