import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

function ItemView(props) {
  const item = props.item
  const findBeer = searchId => {
    let [currentBeer] = props.beers.filter(beer => beer.id === searchId)
    return currentBeer
  }
  const beer = findBeer(item.beerId)
  return (
    <Card>
      <Card.Header>
        <span>{beer.name}</span>
      </Card.Header>
      <Card.Body>
        <img src={beer.imageUrl} />
        <Card.Text>
          {beer.price}
          <Button variant="danger" size="sm">
            remove item
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
const mapStateToProps = state => {
  return {
    beers: state.allBeers
  }
}

export default connect(mapStateToProps)(ItemView)
