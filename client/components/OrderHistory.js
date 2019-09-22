import React from 'react'
import {connect} from 'react-redux'
import {getMyOrders, sortMyOrders} from '../store/myOrders'
import {toDollars} from '../store/allOrders'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {UncontrolledCollapse, CardBody, CardText, CardDeck} from 'reactstrap'

export class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      collapse: false
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
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
  handleChange(event) {
    console.log('THIS PROPS', this.props, event.target)
    return this.props.fetchSortedOrders(event.target.value, this.props.orders)
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
        </div>
        <div>
          <ul>
            <CardDeck>
              {orders === undefined || orders.length === 0
                ? 'Your order history is empty'
                : orders.map(order => (
                    <Card style={{width: '18rem'}} key={order.id}>
                      <Card.Body>
                        <CardText>
                          <div>
                            <li>
                              <div className="details">
                                <p>Date: {this.formatDate(order.createdAt)}</p>
                                <p>Order Status: {order.status}</p>
                                <div>
                                  {' '}
                                  Total Price:{' '}
                                  {toDollars(
                                    order.beers.reduce(function(
                                      totalPrice,
                                      beer
                                    ) {
                                      return (
                                        beer.price *
                                          beer['beer-orders'].quantity +
                                        totalPrice
                                      )
                                    },
                                    0)
                                  )}
                                </div>
                                <p />
                                <p>
                                  {' '}
                                  ---------------------------------------------
                                </p>
                                <Button
                                  variant="primary"
                                  id={`order${order.id}`}
                                  style={{marginBottom: '1rem'}}
                                >
                                  Order Details Toggle
                                </Button>
                                <UncontrolledCollapse
                                  toggler={`#order${order.id}`}
                                >
                                  <Card>
                                    <CardBody>
                                      <span>
                                        <div>
                                          {order.beers.length === 0
                                            ? `${
                                                order.user.username
                                              } has no orders!`
                                            : order.beers.map(beer => (
                                                <div key={beer.id}>
                                                  <p>
                                                    {' '}
                                                    Beer Name: {beer.name}{' '}
                                                  </p>
                                                  <img src={beer.imageUrl} />
                                                  <p>
                                                    {' '}
                                                    Beer Description:{' '}
                                                    {beer.description}{' '}
                                                  </p>
                                                  <p> Beer IBU: {beer.ibu} </p>
                                                  <p>
                                                    {' '}
                                                    Beer Price:{' '}
                                                    {toDollars(beer.price)}{' '}
                                                  </p>

                                                  <p>
                                                    {' '}
                                                    Quantity:{' '}
                                                    {
                                                      beer['beer-orders']
                                                        .quantity
                                                    }
                                                  </p>
                                                </div>
                                              ))}
                                        </div>
                                      </span>
                                    </CardBody>
                                  </Card>
                                </UncontrolledCollapse>
                              </div>
                            </li>
                          </div>
                        </CardText>
                      </Card.Body>
                    </Card>
                  ))}
            </CardDeck>
          </ul>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.myOrders
  }
}

const mapDispatch = dispatch => {
  return {
    fetchMyOrders: () => dispatch(getMyOrders()),
    fetchSortedOrders: (sortBy, myOrders) =>
      dispatch(sortMyOrders(sortBy, myOrders))
  }
}
export default connect(mapState, mapDispatch)(OrderHistory)
