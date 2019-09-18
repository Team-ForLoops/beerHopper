import React from 'react'
import {connect} from 'react-redux'
import {toDollars, getBeers} from '../store/allBeers'
import {Link} from 'react-router-dom'

export class AllBeers extends React.Component {
  componentDidMount() {
    this.props.fetchInitialBeers()
  }

  render() {
    const beers = this.props.beers
    return (
      <div>
        <div>filter</div>
        <div>sort</div>
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
