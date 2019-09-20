import React from 'react'
import {connect} from 'react-redux'
import {toDollars, getBeers, sortBeers} from '../store/allBeers'
import {Link} from 'react-router-dom'
import BeerFilter from './BeerFilter'
// import Accordion from 'react-bootstrap/Accordion'

export class AllBeers extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    return this.props.getSortedBeers(event.target.value, this.props.beers)
  }

  render() {
    const beers = this.props.beers

    return (
      <div>
        <div className="options">
          <select onChange={this.handleChange}>
            <option value="">Sort By...</option>
            <option value="priceHighToLow">Price (high to low)</option>
            <option value="priceLowToHigh">Price (low to high)</option>
            <option value="name">Name</option>
          </select>
          <BeerFilter beers={this.props.beers} />
        </div>
        {this.props.beers.length ? (
          <ul>
            {beers.map(beer => (
              <Link to={`/beer/${beer.id}`} key={beer.id}>
                <li>
                  <div className="highlight">
                    <img src={beer.imageUrl} />
                  </div>
                  <div className="details">
                    <h3>{beer.name}</h3>
                    <div>{toDollars(beer.price)}</div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <button type="submit" onClick={this.props.fetchBeers}>
            How embarassing... no more beers like that. Take me to your leader!
          </button>
        )}
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
    getSortedBeers: (sortBy, beers) => dispatch(sortBeers(sortBy, beers)),
    fetchBeers: () => dispatch(getBeers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBeers)
