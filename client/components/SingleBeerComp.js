// Create Single View Here

import React from 'react'
import {fetchSingleBeer} from '../store/singleBeer' // unassignProjectThunk
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import AddReviewForm from './addNewReview'

class SingleBeer extends React.Component {
  constructor() {
    super()

    this.state = {
      showForm: false
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
              <Link to={`/beer/${beer.id}`}>
                <p>Beer Name: {beer.name}</p>
                <img
                  src={beer.imageUrl}
                  alt={`beer: ${beer.id} Image`}
                  height="230"
                  width="295"
                />
              </Link>
              <p>Beer Type: {beer.type}</p>
              <p>Beer IBU: {beer.ibu}</p>
              <p>Beer Color: {beer.color}</p>
              <p>Beer Description: {beer.description}</p>
              <p>Beer Inventory: {beer.quantityInv}</p>
              <p>Beer Price: {beer.price}</p>
            </li>
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
                <li key={review.id}>
                  <p> Review ID: {review.id} </p>
                  <p> Review Rating: {review.rating} </p>
                  <p> Review Description: {review.description} </p>
                  <p> Reviewer Name: {review.userId} </p> {/* pull name */}
                  <button
                    type="button"
                    onClick={() => {
                      this.props.addReviewThunk(beer, review)
                    }}
                  >
                    {' '}
                    Add Review{' '}
                  </button>
                </li>
              ))}
        </div>

        {/* <add beer to cart /> */}
        {/*         <div>
          <h1>Add to cart</h1>
          <AddToCart beer={beer} />
        </div> */}
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
    loadSingleBeer: id => dispatch(fetchSingleBeer(id))
    // unassignProjectThunk: (beerId, projectId) =>
    //   dispatch(unassignProjectThunk(beerId, projectId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBeer)
