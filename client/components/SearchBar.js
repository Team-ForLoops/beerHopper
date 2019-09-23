import React from 'react'
import {setBeers, searchBeers} from '../store/allBeers'
import {connect} from 'react-redux'

export class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      searchValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const search = this.state.searchValue.replace(' ', '+')
    console.log(search)
    this.props.fetchSearchBeers(search)
    this.setState({
      searchValue: ''
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        🔎
        <input
          placeholder="beer..."
          name="searchValue"
          value={this.state.searchValue}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    beers: state.allBeers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFilteredBeers: beers => dispatch(setBeers(beers)),
    fetchSearchBeers: name => dispatch(searchBeers(name))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
