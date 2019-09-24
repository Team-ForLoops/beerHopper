import React, {Component} from 'react'
import {fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {deleteItemThunk} from '../store/cart'
import {setSubTotalThunk, updateSubTotal} from '../store/subTotal'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

class ItemView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      itemPrice: this.props.item.price,
      itemSubtotal: this.props.item.price
    }
    this.deleteItemHandler = this.deleteItemHandler.bind(this)
  }
  async componentDidMount() {
    let {data} = await axios.get(`/api/cart/${this.props.item.id}/cartData`)
    this.setState({
      quantity: data.quantity,
      itemSubtotal: data.itemSubTotal
    })
  }
  async updateBeerOrder() {
    await axios.put(`/api/cart/updateQuantity/${this.props.item.id}`, {
      quantity: this.state.quantity,
      itemPrice: this.state.itemPrice
    })
  }
  updateCartST = difference => {
    this.props.updateSubTotal(difference)
  }
  incrementQuantity = () => {
    let newQuant = this.state.quantity
    newQuant++
    let price = this.state.itemPrice
    let oldSubtotal = this.state.itemSubtotal
    this.setState(
      {
        quantity: newQuant,
        itemSubtotal: price * newQuant
      },
      this.updateBeerOrder
    )
    this.updateCartST(this.state.itemPrice)
  }
  decreaseQuantity = () => {
    let newQuant = this.state.quantity
    newQuant--
    if (newQuant <= 0) {
      this.props.deleteItem(this.props.item.id)
    } else {
      let price = this.state.itemPrice
      this.setState(
        {
          quantity: newQuant,
          itemSubtotal: price * newQuant
        },
        this.updateBeerOrder
      )
    }
    this.updateCartST(-this.state.itemPrice)
  }

  deleteItemHandler = beerId => {
    this.props.deleteItem(beerId)
  }
  render() {
    const beer = this.props.item
    return (
      <tr className="cart my-2">
        <td>
          <span>
            <img src={beer.imageUrl} />
            <strong>{beer.name}</strong>
          </span>
        </td>
        <td>
          <span className="mx-3">
            Price: ${(this.state.itemSubtotal / 100).toFixed(2)}
          </span>
        </td>
        <td>
          <p>Quantity : {this.state.quantity}</p>
          <span>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={this.decreaseQuantity}
            >
              {' '}
              -
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={this.incrementQuantity}
            >
              {' '}
              +
            </Button>
          </span>
        </td>
        <td>
          <Button
            type="button"
            variant="outline-dark"
            size="sm"
            onClick={() => this.deleteItemHandler(beer.id)}
          >
            remove
          </Button>
        </td>
      </tr>
    )
  }
}
const mapStateToProps = state => {
  return {
    beers: state.allBeers,
    cart: state.cart
  }
}

const mapDispatchStateToProps = dispatch => {
  return {
    deleteItem: beerId => dispatch(deleteItemThunk(beerId)),
    setSubTotal: () => dispatch(setSubTotalThunk()),
    updateSubTotal: newSubTotal => dispatch(updateSubTotal(newSubTotal))
  }
}
export default connect(mapStateToProps, mapDispatchStateToProps)(ItemView)
