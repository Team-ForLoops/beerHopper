import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {} from '../store/orders'

class AddReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      // name: '',
      rating: '',
      description: ''
    }
  }

  handleChange = event => {
    //update the state with input fields
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('In handle change:', this.state)
  }

  handleSubmit = () => {
    //event.preventDefault()
    //clear inputs and make axios post to database, hence post in first part!!!!!
    console.log('before post req')

    const newReview = {
      // name: this.state.name,
      rating: this.state.rating,
      description: this.state.description
    }

    this.props.postReviewThunk(this.props.beer.id, newReview)

    this.setState({
      // name: '',
      rating: '',
      description: ''
    })
  }
  render() {
    return (
      <form onSubmit={() => this.handleSubmit()}>
        {/* <div className="form-group">
          <label htmlFor="name">Reviewer Name:</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
          />
    </div> */}
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
      dispatch(postReviewThunk(beerId, Review)),
    loadSingleBeer: id => dispatch(fetchSingleBeer(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm)

// export default AddReviewForm
