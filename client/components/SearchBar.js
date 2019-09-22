import React from 'react'
import {setBeers, getBeers} from '../store/allBeers'
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
  async handleSubmit(event) {
    event.preventDefault()
    await this.props.fetchInitialBeers()
    const search = this.state.searchValue.toUpperCase()
    console.log(this.state.searchValue)
    const filtered = this.props.beers.filter(beer => {
      const beerName = beer.name.toUpperCase()
      return beerName.includes(search)
    })
    this.props.setFilteredBeers(filtered)
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
    fetchInitialBeers: () => dispatch(getBeers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
