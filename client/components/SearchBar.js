import React from 'react'
import {setBeers, searchBeers} from '../store/allBeers'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

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
        searchValue: event.target.value
      },
      this.helper
    )
  }
  handleSubmit(event) {
    event.preventDefault()

    this.props.helper()
    this.setState({
      searchValue: ''
    })
  }
  helper() {
    const search = this.state.searchValue.replace(' ', '+')
    this.props.history.push('/beers/search?name=' + search)
    this.props.fetchSearchBeers(search)
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} inline>
        🔎
        <FormControl
          placeholder="beer..."
          name="searchValue"
          className="mr-sm-2"
          value={this.state.searchValue}
          onChange={this.handleChange}
        />
      </Form>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchBar)
)
