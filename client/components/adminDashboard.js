import React from 'react'
import {connect} from 'react-ReduxLogger'
import {link} from 'react-router-dom'

class AdminDash extends React.Component {
  render() {
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
    beers: state.beers
  }
}
export default connect(mapState)(AdminDash)
