import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postReviewThunk} from '../store/reviews'

class AddReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      rating: '',
      description: ''
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
    this.props.postReviewThunk(this.props.beer.id, this.state)
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
            value={this.state.rating}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            name="description"
            value={this.state.description}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
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
    postReviewThunk: (beerId, Review) =>
      dispatch(postReviewThunk(beerId, Review))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm)
