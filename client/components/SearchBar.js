import React from 'react'
import {setBeers, searchBeers, getBeers} from '../store/allBeers'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

export class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      searchValue: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.helper = this.helper.bind(this)
  }
  handleChange(event) {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      this.helper
    )
  }
  handleSubmit(event) {
    event.preventDefault()
    this.helper()
    this.setState({
      searchValue: ''
    })
  }
  helper() {
    const search = this.state.searchValue.replace(' ', '+')
    this.props.history.push('/beers/search?name=' + search)
    console.log(search)
    this.props.fetchSearchBeers(search)
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
    fetchSearchBeers: name => dispatch(searchBeers(name)),
    fetchInitialBeers: () => dispatch(getBeers())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
)
