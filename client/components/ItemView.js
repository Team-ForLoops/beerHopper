import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'

function ItemView(props) {
  const item = props.item
  const findBeer = searchId => {
    let [currentBeer] = props.beers.filter(beer => beer.id === searchId)
    return currentBeer
  }
  const beer = findBeer(item.beerId)
  return (
    <div id="item-container">
      <span>{beer.name}</span>
      <img src={beer.imageUrl} />
      <span>{beer.price}</span>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    beers: state.allBeers
  }
}

export default connect(mapStateToProps)(ItemView)
