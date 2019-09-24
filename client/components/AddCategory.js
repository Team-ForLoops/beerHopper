import React, {Component} from 'react'
import {connect} from 'react-redux'
import {postCategory} from '../store/categories'
import {Redirect} from 'react-router-dom'

class AddCategory extends Component {
  constructor() {
    super()
    this.state = {
      type: '',
      success: false
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      success: false
    })
  }
  handleSubmit = () => {
    event.preventDefault()
    const {type} = this.state
    this.props.getWithNewCategory({type})
    this.setState({
      type: '',
      success: true
    })
  }
  render() {
    function isAlpha(str) {
      const regexp = /^[A-Za-z]+$/
      if (!str.length) return true
      if (regexp.test(str)) return true
    }
    function lengthCheck(str) {
      if (str.length >= 3 && str.length <= 10) return true
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
        <button
          type="submit"
          className="btn btn-primary"
          disabled={
            isAlpha(this.state.type) && lengthCheck(this.state.type)
              ? false
              : 'disabled'
          }
        >
          Submit
        </button>
        {isAlpha(this.state.type) === true ? null : <div>Only letters!</div>}
        {this.state.success && <div>Added!</div>}
        {/* {this.state.success && <Redirect to='/admin/dashboard' />} */}
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
