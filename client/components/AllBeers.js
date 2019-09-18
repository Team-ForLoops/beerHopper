import React from 'react'
import {connect} from 'react-redux'
import {getBeers} from '../store/allBeers'

export class AllBeers extends React.Component {
  componentDidMount() {
    this.props.fetchInitialBeers()
  }

  render() {
    const beers = this.props.beers
    console.log(beers)
    return (
      <div>
        {beers.map(beer => (
          <div key={beer.id} className="list-container card">
            <div className="highlight">
              <img src={beer.imageUrl} />
            </div>
            <h3>{beer.name}</h3>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    beers: state.allBeers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchInitialBeers: () => dispatch(getBeers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBeers)
