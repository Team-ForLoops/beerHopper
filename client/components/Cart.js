import React, {Component} from 'react'
import {connect} from 'react-redux'
import ItemView from './ItemView'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {checkoutThunk, fetchCart} from '../store/cart'
import {setSubTotalThunk, clearSubTotal} from '../store/subTotal'
import {Link} from 'react-router-dom'

class Cart extends Component {
  componentDidMount() {
    this.props.setSubTotal()
    this.props.fetchCart()
  }
  checkoutHandler = () => {
    this.props.checkout(this.props.subTotal)
    this.props.clearSubTotal()
  }
  render() {
    const cart = this.props.cart || []
    return (
      <React.Fragment>
        <Table className="mx-5 cart">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map(item => <ItemView key={item.id} item={item} />)
            ) : (
              <tr>
                <td className="mx-5">
                  There are no items in your cart!
                  <Link to="/beers">
                    <Button variant="info">Go Back to Beers</Button>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {cart.length > 0 && (
          <Container>
            <Button variant="success" onClick={this.checkoutHandler}>
              Checkout
            </Button>
            <span className="mx-5">
              {' '}
              Subtotal: ${(this.props.subTotal / 100).toFixed(2)}
            </span>
          </Container>
        )}
        {this.props.user.id && (
          <Container className="my-5">
            Hello {this.props.user.username}! View or Edit Your Orders:
            <Link to="/orders/myOrders">
              <Button className="mx-2" variant="outline-dark">
                My Orders
              </Button>{' '}
            </Link>
          </Container>
        )}
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart,
    subTotal: state.subTotal,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkout: cartSubTotal => dispatch(checkoutThunk(cartSubTotal)),
    setSubTotal: () => dispatch(setSubTotalThunk()),
    clearSubTotal: () => dispatch(clearSubTotal()),
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
