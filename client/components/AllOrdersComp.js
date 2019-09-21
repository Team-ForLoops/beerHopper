import React from 'react'
import {connect} from 'react-redux'
import {toDollars, getOrders} from '../store/allOrders' // sortOrders
import {updateOrderThunk, fetchSingleOrder} from '../store/singleOrder'
// Status Filter import BeerFilter from './BeerFilter'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {UncontrolledCollapse, CardBody} from 'reactstrap'

export class AllOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapse: false,
      showForm: false,
      stat: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchInitialOrders()
    } catch (error) {
      console.error(error)
    }
  }

  clickHandlerOne() {
    let hidden = this.state.showForm
    this.setState({
      showForm: !hidden
    })
  }

  handleChange(event) {
    //console.log('event.target', event.target)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(orderId) {
    event.preventDefault()

    const updatedOrder = {
      id: orderId,
      status: this.state.stat
    }

    // console.log('UPDATE ORDER', updatedOrder)

    await this.props.updateOrderThunk(updatedOrder)
    this.props.fetchInitialOrders()
  }

  render() {
    const orders = this.props.orders
    // console.log('PROPS', this.props)
    // console.log('ORDER BEERS', this.props.orders.beers)

    // const beers = orders.beers || []

    return (
      <div>
        {/* <div className="options">
          <select onChange={this.handleChange}>
            <option value="">Sort By...</option>
            <option value="priceHighToLow">Price (high to low)</option>
            <option value="priceLowToHigh">Price (low to high)</option>
            <option value="name">Name</option>
          </select>

          <BeerFilter />
    </div> */}

        <div className="orders-list">
          {orders.map(order => (
            <Card style={{width: '18rem'}} key={order.id}>
              <Card.Body>
                <Card.Title>Order Id: {order.id}</Card.Title>
                <Card.Text>
                  <div>
                    <ul>
                      <li>
                        <div className="highlight">
                          <img src={order.user.imageUrl} />
                        </div>
                        <div className="details">
                          <p>User: {order.user.username}</p>
                          <p>Order Status: {order.status}</p>
                          <div>
                            {' '}
                            Total Quantity:
                            {order.beers.reduce(function(totalQuantity, beer) {
                              return (
                                beer['beer-orders'].quantity + totalQuantity
                              )
                            }, 0)}
                          </div>
                          <div>
                            {' '}
                            Total Price:
                            {toDollars(
                              order.beers.reduce(function(totalPrice, beer) {
                                return (
                                  beer.price * beer['beer-orders'].quantity +
                                  totalPrice
                                )
                              }, 0)
                            )}
                          </div>
                          <p />
                          <Button
                            id={`status${order.id}`}
                            onClick={() => {
                              this.clickHandlerOne()
                            }}
                            variant="danger"
                          >
                            Update Status Toggle
                          </Button>
                          <UncontrolledCollapse toggler={`#status${order.id}`}>
                            {/* {this.state.showForm && (
                              <UpdateOrderStatus orderId={order.id} />
                            )} */}
                            <form onSubmit={() => this.handleSubmit(order.id)}>
                              <div>
                                <span>
                                  <select
                                    name="stat"
                                    value={
                                      typeof order.status === 'string'
                                        ? this.state.stat
                                        : order.status
                                    }
                                    onChange={this.handleChange}
                                  >
                                    <option value="">
                                      select order status
                                    </option>
                                    <option value="open">open</option>
                                    <option value="processing">
                                      processing
                                    </option>
                                    <option value="cancelled">cancelled</option>
                                  </select>
                                </span>

                                <p />
                                <span>
                                  <p>
                                    {/* */}
                                    <button type="submit">Edit</button>
                                  </p>
                                </span>

                                {/* delete thunk
                              <span>
                                <p>
                                  <button type="button">Delete</button>
                                </p>
                              </span>
                              */}
                              </div>
                            </form>
                          </UncontrolledCollapse>
                          <p> -----------------------------------------</p>
                          <Button
                            variant="primary"
                            id={`order${order.id}`}
                            style={{marginBottom: '1rem'}}
                          >
                            Order Details Toggle
                          </Button>
                          <UncontrolledCollapse toggler={`#order${order.id}`}>
                            <Card>
                              <CardBody>
                                <span>
                                  <div>
                                    {order.beers.length === 0
                                      ? `${order.user.username} has no orders!`
                                      : order.beers.map(beer => (
                                          <div key={beer.id}>
                                            <p> Beer Name: {beer.name} </p>
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
                                              --------------------------------
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
                    </ul>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleOrder: id => dispatch(fetchSingleOrder(id)),
    updateOrderThunk: updatedOrder => dispatch(updateOrderThunk(updatedOrder)),
    //getSortedBeers: (sortBy, beers) => dispatch(sortBeers(sortBy, beers)),
    fetchInitialOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
