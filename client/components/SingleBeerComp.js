// Create Single View Here

import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer' // unassignProjectThunk
import {connect} from 'react-redux'
import {toDollars} from '../store/allBeers'
import AddReviewForm from './AddReviewForm'
import EditReviewForm from './EditReviewForm'
import {addItemThunk} from '../store/cart'
import {Link} from 'react-router-dom'
import {fetchReviews} from '../store/reviews'
import {removeReview} from '../store/singleReview'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

class SingleBeer extends React.Component {
  constructor() {
    super()

    this.state = {
      showForm: false,
      showCart: false,
      showEditForm: false
    }
    this.clickHandler = this.clickHandler.bind(this)
    this.clickEditHandler = this.clickEditHandler.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchReviews(this.props.match.params.beerId)
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

  clickEditHandler() {
    let editHidden = this.state.showEditForm

    this.setState({
      showEditForm: !editHidden,
      showForm: false
    })
  }

  addToCartHandler = () => {
    const beerId = this.props.beer.id
    this.props.addItem({id: beerId, quantity: 1})
    const message = this.state.showCart
    this.setState({showCart: true})
  }

  hasUserReviewed = reviews => {
    const userId = this.props.user.id

    let reviewed = false

    reviews.map(review => {
      if (review.user.id === userId) {
        reviewed = true
      }
    })
    return reviewed
  }

  deleteReview = async reviewId => {
    await this.props.deleteReview(reviewId)
    await this.props.loadSingleBeer(this.props.beer.id)
    await this.props.fetchReviews(this.props.beer.id)
  }

  getEditReview = reviews => {
    const userId = this.props.user.id
    let editReview
    reviews.map(review => {
      if (review.user.id === userId) {
        editReview = review
      }
    })
    return editReview
  }

  // eslint-disable-next-line complexity
  render() {
    // single beer prop
    // reviews are properties on beer

    const beer = this.props.beer || {}
    // reviews array inside beer prop

    const reviews = this.props.reviews || []

    return (
      <Container className="mx-auto" id="single-beer">
        {this.props.user.isAdmin ? (
          <div className="my-3">
            <h2>Welcome Admin!</h2>{' '}
            <Link to={`/admin/edit/beer/${beer.id}`}>
              <Button>Edit Beer</Button>
            </Link>
          </div>
        ) : (
          ''
        )}
        <Row className="my-4">
          {beer.quantityInv <= 0 ? (
            <h3 className="text-danger">OUT OF STOCK!</h3>
          ) : (
            <Button
              variant="warning"
              className="sm"
              onClick={() => this.addToCartHandler()}
            >
              Add To Cart
            </Button>
          )}
          {this.state.showCart && (
            <span className="mx-5">
              This item was added to your cart!
              <Link to="/cart">
                <Button variant="success" className="mx-3">
                  Go To Cart
                </Button>
              </Link>
            </span>
          )}
          <Link to="/beers">
            <Button variant="dark">Continue Shopping</Button>
          </Link>
        </Row>
        <Container>
          <Row className="justify-content-sm-center">
            <Col className="single-beer px-0">
              <img src={beer.imageUrl} />
            </Col>
            <Col xs={8} className="flex-grow-1 bd-highlight">
              <Row className="font-weight-bold text-uppercase justify-content-center my-3">
                {beer.name}
              </Row>
              <Row>
                <ul>
                  <li>
                    <p>Rating: {beer.averageRating}</p>
                    <p>IBU: {beer.ibu}</p>
                    <p>Color: {beer.color}</p>
                    <p>Description: {beer.description}</p>
                    <p>Total Inventory: {beer.quantityInv} beers</p>
                    <div>
                      {beer.quantityInv > 0 ? (
                        <span>IN STOCK </span>
                      ) : (
                        <span className="text-danger">OUT OF STOCK</span>
                      )}
                      {beer.quantityInv <= 10 && beer.quantityInv > 0 ? (
                        <span className="text-danger">
                          Only {beer.quantityInv} Left!
                        </span>
                      ) : (
                        ''
                      )}
                      <span>| Price: {toDollars(beer.price)}</span>
                    </div>
                  </li>
                </ul>
              </Row>
            </Col>
          </Row>
          {/* setup conditional for if beer has no projects */}
          <Row>
            {this.props.user.id ? (
              this.hasUserReviewed(reviews) ? (
                <Row>
                  <Button
                    onClick={() => {
                      this.clickEditHandler()
                    }}
                    type="button"
                    variant="light"
                  >
                    Edit Review
                  </Button>
                  <Button
                    onClick={() =>
                      this.deleteReview(this.getEditReview(beer.reviews).id)
                    }
                  >
                    Remove Review
                  </Button>
                </Row>
              ) : (
                <Button
                  onClick={() => {
                    this.clickHandler()
                  }}
                  type="button"
                  variant="light"
                >
                  Add Review
                </Button>
              )
            ) : (
              <div className="">
                <Link to="/signup">Sign Up to Leave a Review!</Link>
              </div>
            )}
            {this.state.showForm && (
              <AddReviewForm clickHandler={this.clickHandler} />
            )}
            {this.state.showEditForm && (
              <EditReviewForm
                review={this.getEditReview(beer.reviews)}
                clickEditHandler={this.clickEditHandler}
              />
            )}
          </Row>

          <table id="single-beer-reviews" className="my-3">
            {reviews.length === 0
              ? `${beer.name} has no reviews!`
              : reviews.map(review => (
                  <tr
                    key={review.id}
                    className="border-top border-bottom border-dark"
                  >
                    <p> Rating: {review.rating} </p>
                    <p> {review.description} </p>
                    <p> Reviewer: {review.user.username} </p>
                    {/* pull name */}
                  </tr>
                ))}
          </table>
        </Container>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    beer: state.singleBeer,
    user: state.user,
    reviews: state.reviews
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleBeer: id => dispatch(fetchSingleBeer(id)),
    addItem: itemDetail => dispatch(addItemThunk(itemDetail)),
    fetchReviews: beerId => dispatch(fetchReviews(beerId)),
    deleteReview: reviewId => dispatch(removeReview(reviewId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBeer)
