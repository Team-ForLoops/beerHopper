// Create Single View Here

import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer' // unassignProjectThunk
import {connect} from 'react-redux'
import {toDollars} from '../store/allBeers'
import AddReviewForm from './addNewReview'
import {addItemThunk} from '../store/cart'

import Button from 'react-bootstrap/Button'

class SingleBeer extends React.Component {
  constructor() {
    super()

    this.state = {
      showForm: false
    }
  }

  componentDidMount() {
    try {
      console.log('this.props.match.params', this.props)
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
    this.props.addItem({beerId, quantity: 1})
  }

  render() {
    // single beer prop
    // reviews are properties on beer

    const beer = this.props.beer || {}
    console.log('BEER PROP', beer)
    console.log('BEER PROP SINGLEBEER', this.props)

    // reviews array inside beer prop

    const reviews = beer.reviews || []
    console.log('REVIEWS PROP', reviews)

    return (
      <div>
        <div id="single-beer" className="column">
          <ul>
            <li>
              <p>Beer Name: {beer.name}</p>
              <img src={beer.imageUrl} className="highlight" />
            </li>
            <div className="details">
              <li>
                <p>Beer Type: {beer.type}</p>
                <p>Beer IBU: {beer.ibu}</p>
                <p>Beer Color: {beer.color}</p>
                <p>Beer Description: {beer.description}</p>
                {/* <p>Beer Inventory: {beer.quantityInv}</p> */}
                {/* maybe add a message about low quantity later */}
                <p>Beer Price: {toDollars(beer.price)}</p>
              </li>
            </div>
          </ul>
        </div>
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
        <div id="single-beer-reviews" className="set-later">
          {reviews.length === 0
            ? `${beer.name} has no reviews!`
            : reviews.map(review => (
                <div key={review.id}>
                  <p> Review Rating: {review.rating} </p>
                  <p> Review Description: {review.description} </p>
                  <p> Reviewer Name: {review.user.username} </p>
                  {/* pull name */}
                  <p> ---------------------------------------------------</p>
                </div>
              ))}
        </div>

        {/* <add beer to cart /> */}
        <Button variant="warning" onClick={() => this.addToCartHandler()}>
          Add To Cart
        </Button>
      </div>
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
