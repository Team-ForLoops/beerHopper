import React from 'react'
import {connect} from 'react-redux'
import {getBeers} from '../store/allBeers'
import {Link} from 'react-router-dom'
import {getMyOrder, getSingleOrder} from '../store/orders'

export class OrdersHistory extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <div>
          <h1>Order History</h1>
        </div>

        <div className="options">
          <select onChange={this.handleChange}>
            <option value="" selected="disabled">
              Sort By...
            </option>
            <option value="dateOld">Date (oldest first)</option>
            <option value="dateNew">Date (newest first)</option>
          </select>
          {/* <BeerFilter beers={this.props.beers} /> */}
        </div>
        {this.props.orders.length
          ? 'Your order history is empty'
          : this.props.orders.map(order => {
              return (
                <li key={order.id}>
                  <Link to={`/orders/my/${order.id}`}>
                    <button>Details</button>
                  </Link>
                </li>
              )
            })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => dispatch(getMyOrder()),
    fetchSingleOrder: orderId => dispatch(getSingleOrder(orderId))
  }
}
