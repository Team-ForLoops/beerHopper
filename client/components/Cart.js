import React, {Component} from 'react'
import {connect} from 'react-redux'
import ItemView from './ItemView'
import {fetchCart} from '../store/cart'

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart()
  }
  render() {
    const cart = this.props.cart.cart || {}
    const thing = {...cart[0]}
    console.log('cart', cart)
    console.log('thing', thing)
    const beers = thing.beers || []
    return (
      <div>
        {beers ? 'add items view' : 'There are no items in your cart!'}
        {/* {items.map(item => (
          <ItemView key ={item.id} item = {item}/>
        ))} */}
      </div>
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
