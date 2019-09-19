import React, {Component} from 'react'
import {connect} from 'react-redux'
import ItemView from './ItemView'
import {fetchCart} from '../store/cart'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class Cart extends Component {
  render() {
    const cart = this.props.cart || {}
    const items = cart.items || []
    return (
      <Container>
        {items !== []
          ? items.map(item => <ItemView key={item.beerId} item={item} />)
          : 'There are no items in your cart!'}

        <Button variant="success">Checkout</Button>
      </Container>
    )
  }
}
const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Cart)
