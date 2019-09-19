import React, {Component} from 'react'
import {connect} from 'react-redux'
import ItemView from './ItemView'
import {fetchCart} from '../store/cart'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const cart = this.props.cart || {}
    const beers = cart.items || []
    return (
      <Container>
        {beers
          ? beers.map(beer => <ItemView key={beer.id} item={beer} />)
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
const mapDispatchToProps = dispatch => {
  return {
    fetchCart: () => dispatch(fetchCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
