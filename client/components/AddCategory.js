import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postCategory} from '../store/categories'

class AddCategory extends Component {
  constructor() {
    super()
    this.state = {
      type: ''
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = () => {
    event.preventDefault()
    this.props.getWithNewCategory(this.state)
    this.setState({
      type: ''
    })
  }
  render() {
    function isAlpha(str) {
      const regexp = /^[A-Za-z]+$/
      if (regexp.test(str)) return true
    }
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <div className="form-group">
          <label htmlFor="type">New Category:</label>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            minLength="3"
            maxLength="10"
            name="type"
            value={this.state.type}
            required
            pattern="[a-zA-Z]+"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {isAlpha(this.state.type) ? null : <div>Only letters!</div>}
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getWithNewCategory: category => dispatch(postCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory)
