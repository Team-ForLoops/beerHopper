import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleReview, updateReviewThunk} from '../store/singleReview'
import {fetchSingleBeer} from '../store/singleBeer'
import {fetchReviews} from '../store/reviews'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

class EditReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: this.props.review.rating,
      description: this.props.review.description
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    try {
      this.props.getBeer(this.props.beer.id)
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

  handleSubmit = async () => {
    event.preventDefault()

    try {
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

      await this.props.updateReview(updatedReview)
      this.setState({
        rating: '',
        description: ''
      })
      await this.props.getBeer(this.props.beer.id)
      await this.props.fetchReviews(this.props.beer.id)
    } catch (error) {
      console.error(error)
    }
    this.props.clickEditHandler()
  }
  render() {
    return (
      <Container className="mx-auto">
        <Form onSubmit={() => this.handleSubmit()}>
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
                typeof this.state.rating === 'string'
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
                typeof this.state.description === 'string'
                  ? this.state.description
                  : this.props.review.description
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Edit
          </button>
        </Form>
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
    fetchSingleReview: reviewId => dispatch(fetchSingleReview(reviewId)),
    updateReview: reviewUpdate => dispatch(updateReviewThunk(reviewUpdate)),
    getBeer: beerId => dispatch(fetchSingleBeer(beerId)),
    fetchReviews: beerId => dispatch(fetchReviews(beerId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewForm)
