import React, {Component} from 'react'
import {fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {deleteItemThunk} from '../store/cart'
import Table from 'react-bootstrap/Table'
import axios from 'axios'

class ItemView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      price: this.props.item.price
    }
    this.deleteItemHandler = this.deleteItemHandler.bind(this)
  }
  async componentDidMount() {
    let {data} = await axios.get(`/api/cart/${this.props.item.id}/quantity`)
    this.setState({quantity: data})
  }
  incrementQuantity = () => {
    async function updateQ() {
      await axios.put(
        `/api/cart/updateQuantity/${this.props.item.id}`,
        this.state
      )
    }
    let newQuant = this.state.quantity
    newQuant++
    let oldPrice = this.state.price
    this.setState(
      {
        quantity: newQuant,
        price: oldPrice * newQuant
      },
      updateQ
    )
  }
  decreaseQuantity = async () => {
    let newQuant = this.state.quantity
    this.setState({
      quantity: --newQuant
    })
  }

  deleteItemHandler = beerId => {
    //console.log(beerId);
    this.props.deleteItem(beerId)
  }
  render() {
    const beer = this.props.item
    return (
      <tr className="my-2">
        <td>
          <span>
            <img src={beer.imageUrl} />
            <strong>{beer.name}</strong>
          </span>
        </td>
        <td>
          <div className="mx-3">
            Price: ${(this.state.price / 100).toFixed(2)}
          </div>
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
        <div>
          <Button
            type="button"
            variant="outline-dark"
            size="sm"
            onClick={() => this.deleteItemHandler(beer.id)}
          >
            remove
          </Button>
        </div>
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
    deleteItem: beerId => dispatch(deleteItemThunk(beerId))
  }
}
export default connect(mapStateToProps, mapDispatchStateToProps)(ItemView)
