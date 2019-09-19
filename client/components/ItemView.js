import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

function ItemView(props) {
  const item = props.item
  const findBeer = searchId => {
    let [currentBeer] = props.beers.filter(beer => beer.id === searchId)
    return currentBeer
  }
  const beer = findBeer(item.beerId)
  return (
    <Row>
      <span>{beer.name}</span>
      <img src={beer.imageUrl} />
      <span>{beer.price}</span>
    </Row>
  )
}
const mapStateToProps = state => {
  return {
    beers: state.allBeers
  }
}

export default connect(mapStateToProps)(ItemView)
