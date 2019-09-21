import React from 'react'
import {connect} from 'react-redux'
import {toDollars, getOrders} from '../store/allOrders' // sortOrders
import BeerFilter from './BeerFilter'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {UncontrolledCollapse, CardBody} from 'reactstrap'
import UpdateOrderStatus from './UpdateOrderStatusComp'
//import AddReviewForm from './addNewReview'
// import UpdateBeer from './UpdateBeerComp'   delete

export class AllOrders extends React.Component {
  constructor(props) {
    super(props)
    //this.toggle = this.toggle.bind(this)
    this.state = {
      collapse: false,
      showForm: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  // toggle() {
  //   this.setState(state => ({collapse: !state.collapse}))
  // }

  componentDidMount() {
    try {
      this.props.fetchInitialOrders()
    } catch (error) {
      console.error(error)
    }
  }

  clickHandler() {
    let hidden = this.state.showForm
    this.setState({
      showForm: !hidden
    })
  }

  // handleChange(event) {
  //   return this.props.getSortedBeers(event.target.value, this.props.beers)
  // }

  render() {
    const orders = this.props.orders
    console.log('PROPS', this.props)
    console.log('ORDER BEERS', this.props.orders.beers)

    const beers = orders.beers || []

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
                              this.clickHandler()
                            }}
                            variant="danger"
                          >
                            Update Status Toggle
                          </Button>
                          <UncontrolledCollapse toggler={`#status${order.id}`}>
                            {this.state.showForm && (
                              <UpdateOrderStatus orderId={order.id} />
                            )}
                          </UncontrolledCollapse>
                          <p>
                            {' '}
                            ---------------------------------------------------
                          </p>
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
                                            {/* pull name */}
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
    //getSortedBeers: (sortBy, beers) => dispatch(sortBeers(sortBy, beers)),
    fetchInitialOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
