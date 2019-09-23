import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postReviewThunk} from '../store/reviews'
import {fetchSingleBeer} from '../store/singleBeer'

class EditReviewForm extends Component {
  constructor(props) {
    super(props)
    console.log('review', this.props)
    this.state = {
      rating: this.props.review.rating,
      description: this.props.review.description
    }
  }
  componentDidMount() {
    console.log('review', this.props.review)
    try {
      this.props.getBeer(this.props.match.params.beerId)
    } catch (error) {
      console.error(error)
    }
  }
  handleChange = event => {
    //update the state with input fields
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    event.preventDefault()

    const updatedReview = {
      id: this.props.review.id,
      rating:
        typeof this.state.rating === 'string'
          ? this.state.rating
          : this.props.review.rating,
      description:
        typeof this.state.description === 'string'
          ? this.state.description
          : this.props.review.description
    }

    this.props.updateReview(updatedReview)
    this.setState({
      rating: '',
      description: ''
    })
  }
  render() {
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="number"
            min="1"
            max="5"
            name="rating"
            value={
              typeof this.state.name === 'string'
                ? this.state.rating
                : this.props.review.rating
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            name="description"
            value={
              this.state.description === 'string'
                ? this.state.description
                : this.props.review.description
            }
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    review: state.singleReview
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleReview: reviewId => dispatch(fetchSingleReview(reviewId)),
    updateReview: reviewUpdate => dispatch(updateReviewThunk(reviewUpdate)),
    getBeer: beerId => dispatch(fetchSingleBeer(beerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm)
