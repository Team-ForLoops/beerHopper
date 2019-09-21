import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getMyOrder} from '../store/myOrders'
import SingleOrder from './SingleOrder'

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false
    }
    this.clickHandler = this.clickHandler.bind(this)
  }
  componentDidMount() {
    console.log('ORDER PROPS', this.props.orders)
    this.props.fetchMyOrders()
  }
  formatDate(date) {
    const newDate = new Date(date)
    return newDate.toLocaleString()
  }
  clickHandler() {
    let hidden = this.state.showForm
    this.setState({
      showForm: !hidden
    })
  }
  render() {
    const orders = this.props.orders || []
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
        {orders === undefined || orders.length === 0 ? (
          'Your order history is empty'
        ) : (
          <ul>
            {orders.map(order => {
              return (
                <li key={order.id}>
                  <div className="order-card">
                    <p>Date: {this.formatDate(order.createdAt)}</p>
                    <p>Order Status: {order.status}</p>
                    <p>Total: </p>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        this.clickHandler()
                      }}
                      type="button"
                    >
                      Order Details
                    </button>
                    {this.state.showForm && <SingleOrder />}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
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
    fetchMyOrders: () => dispatch(getMyOrder())
  }
}
export default connect(mapState, mapDispatch)(OrderHistory)
