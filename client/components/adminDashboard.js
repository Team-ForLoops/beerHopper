import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getBeers} from '../store/allBeers'

class AdminDash extends React.Component {
  render() {
    console.log('before beer......', this.props.beers)
    const beers = this.props.beers
    console.log('beer variable......', beers)
    return (
      <div>
        <div>
          <h2>Product Dashboard</h2>
          <ul>
            {beers === undefined || beers.length === 0
              ? 'No beer in inventory'
              : beers.map(beer => {
                  return (
                    <li key={beer.id}>
                      <img className="image" src={beer.imageUrl} />
                      <p>Name: {beer.name}</p>
                      <p>Price: {beer.price}</p>
                      <p>Amount in stock: {beer.quantity}</p>
                      <Link to={`/beer/${beer.id}/edit}`}>
                        <button
                          type="button"
                          className="edit"
                          onClick={() => editBeer(beer.id)}
                        >
                          Edit
                        </button>
                      </Link>
                    </li>
                  )
                })}
          </ul>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    beers: state.allBeers
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     fetchBeers: () => dispatch(getBeers)
//   }
// }

export default connect(mapState)(AdminDash)
