import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ItemView(props) {
  const item = props.item
  const findBeer = searchId => {
    let [currentBeer] = props.beers.filter(beer => beer.id === searchId)
    return currentBeer
  }
  const beer = findBeer(item.beerId)
  return (
    <Row>
      <Col sm={4}>
        <span>{beer.name}</span>
        <img src={beer.imageUrl} />
        <span>{beer.price}</span>
      </Col>
    </Row>
  )
}
const mapStateToProps = state => {
  return {
    beers: state.allBeers
  }
}

export default connect(mapStateToProps)(ItemView)
