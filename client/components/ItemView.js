import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'

function ItemView(props) {
  const item = props.item
  props.fetchBeer(item.beerId)
  const beer = props.beer
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
    beer: state.singleBeer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchBeer: beerId => dispatch(fetchSingleBeer(beerId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemView)
