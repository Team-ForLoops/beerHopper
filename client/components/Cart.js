import React, {Component} from 'react'
import {connect} from 'react-redux'
import ItemView from './ItemView'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import {checkoutThunk} from '../store/cart'

class Cart extends Component {
  checkoutHandler = () => {
    this.props.checkout()
  }
  render() {
    const cart = this.props.cart || []
    console.log(this.props)

    return (
      <Table className="mx-5">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {cart !== []
            ? cart.map(item => <ItemView key={item.id} item={item} />)
            : 'There are no items in your cart!'}
        </tbody>
        <Container>
          <Button variant="success" onClick={this.checkoutHandler}>
            Checkout
          </Button>
        </Container>
      </Table>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = dispatch => {
  return {
    checkout: () => dispatch(checkoutThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
