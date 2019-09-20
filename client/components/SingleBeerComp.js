// Create Single View Here

import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer' // unassignProjectThunk
import {connect} from 'react-redux'
import {toDollars} from '../store/allBeers'
import AddReviewForm from './addNewReview'
import {addItemThunk} from '../store/cart'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

class SingleBeer extends React.Component {
  constructor() {
    super()

    this.state = {
      showForm: false,
      showCart: false
    }
  }

  componentDidMount() {
    try {
      this.props.loadSingleBeer(this.props.match.params.beerId)
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
  addToCartHandler = () => {
    const beerId = this.props.beer.id
    this.props.addItem({id: beerId, quantity: 1})
    const message = this.state.showCart
    this.setState({showCart: true})
  }

  render() {
    // single beer prop
    // reviews are properties on beer

    const beer = this.props.beer || {}
    // reviews array inside beer prop

    const reviews = beer.reviews || []

    return (
      <Container className="mx-5" id="single-beer">
        <img src={beer.imageUrl} className="highlight text-center" />
        <Card.Body>
          <Card.Title>Beer Name: {beer.name}</Card.Title>
          <Card.Text>
            <div className="details">
              <ul>
                <li>
                  <p>Beer Type: {beer.type}</p>
                  <p>Beer IBU: {beer.ibu}</p>
                  <p>Beer Color: {beer.color}</p>
                  <p>Beer Description: {beer.description}</p>
                  {/* <p>Beer Inventory: {beer.quantityInv}</p> */}
                  {/* maybe add a message about low quantity later */}
                  <p>Beer Price: {toDollars(beer.price)}</p>
                </li>
              </ul>
            </div>
          </Card.Text>
          {/* setup conditional for if beer has no projects */}
          <div>
            <button
              onClick={() => {
                this.clickHandler()
              }}
              type="button"
            >
              Add Review
            </button>
            {this.state.showForm && <AddReviewForm />}
          </div>
          <table id="single-beer-reviews" className="set-later">
            {reviews.length === 0
              ? `${beer.name} has no reviews!`
              : reviews.map(review => (
                  <tr key={review.id}>
                    <p> Review Rating: {review.rating} </p>
                    <p> Review Description: {review.description} </p>
                    <p> Reviewer Name: {review.user.username} </p>
                    {/* pull name */}
                  </tr>
                ))}
          </table>

          {/* <add beer to cart /> */}
          <Button
            variant="warning"
            className="sm"
            onClick={() => this.addToCartHandler()}
          >
            Add To Cart
          </Button>
          {this.state.showCart && (
            <div>
              <span>This item was added to your cart!</span>
              <Button variant="success">Go To Cart</Button>
            </div>
          )}
        </Card.Body>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    beer: state.singleBeer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleBeer: id => dispatch(fetchSingleBeer(id)),
    addItem: itemDetail => dispatch(addItemThunk(itemDetail))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBeer)
