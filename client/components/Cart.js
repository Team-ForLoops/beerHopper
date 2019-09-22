import React, {Component} from 'react'
import {connect} from 'react-redux'
import ItemView from './ItemView'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {checkoutThunk} from '../store/cart'
import {setSubTotalThunk, clearSubTotal} from '../store/subTotal'
import {Link} from 'react-router-dom'

class Cart extends Component {
  componentDidMount() {
    this.props.setSubTotal()
  }
  checkoutHandler = () => {
    this.props.checkout(this.props.subTotal)
    this.props.clearSubTotal()
  }
  render() {
    const cart = this.props.cart || []
    console.log(cart)
    return (
      <React.Fragment>
        <Table className="mx-5">
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
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart,
    subTotal: state.subTotal
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkout: cartSubTotal => dispatch(checkoutThunk(cartSubTotal)),
    setSubTotal: () => dispatch(setSubTotalThunk()),
    clearSubTotal: () => dispatch(clearSubTotal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
