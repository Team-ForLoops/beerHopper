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

class ItemView extends Component {
  constructor() {
    super()
    this.deleteItemHandler = this.deleteItemHandler.bind(this)
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
            Price: ${Math.floor(beer.price / 100).toFixed(2)}
          </div>
        </td>
        <td>
          <p>Quantity : 1</p>
          <span>
            <Button type="button" variant="primary" size="sm">
              {' '}
              -
            </Button>
            <Button type="button" variant="primary" size="sm">
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
