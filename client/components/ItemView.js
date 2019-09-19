import React, {Component} from 'react'
import {fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import {deleteItemThunk} from '../store/cart'

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
      <Card>
        <Card.Header>
          <span>{beer.name}</span>
        </Card.Header>
        <Card.Body>
          <img src={beer.imageUrl} />
          <Card.Text>
            {beer.price}
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={() => this.deleteItemHandler(beer.id)}
            >
              remove item
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
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
