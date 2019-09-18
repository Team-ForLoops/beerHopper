import React, {Component} from 'react'
import axios from 'axios'

class AddReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
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
  handleSubmit = async () => {
    //clear inputs and make axios post to database, hence post in first part!!!!!
    console.log('before post req')
    //  try {
    //     //  await axios.post('/student', this.state);
    //  }catch(err){
    //      console.log(err.message);
    //  }
    //  console.log(this.state)
    //  this.setState({
    //      firstName: '',
    //      lastName: '',
    //      email: ''
    //  });
  }
  render() {
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <div className="form-group">
          <label htmlFor="name">Reviewer Name:</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            name="name"
            value={this.state.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            name="rating"
            value={this.state.rating}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="email"
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

export default AddReviewForm
