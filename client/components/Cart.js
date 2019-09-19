import React, {Component} from 'react'
import {connect} from 'react-redux'
import ItemView from './ItemView'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

class Cart extends Component {
  render() {
    const cart = this.props.cart || {}
    console.log(this.props)
    let items = cart.items || []
    return (
      <Container>
        <Row>
          {items !== []
            ? items.map(item => <ItemView key={item.id} item={item} />)
            : 'There are no items in your cart!'}
        </Row>
        <Row>
          <Button variant="success">Checkout</Button>
        </Row>
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
