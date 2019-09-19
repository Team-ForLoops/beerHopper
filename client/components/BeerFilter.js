import React from 'react'
import {connect} from 'react-redux'
import {filterBeers} from '../store/allBeers'

export class BeerFilter extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.value]: event.target.checked
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    console.log(this.state)
  }

  render() {
    return (
      <div>
        Filter:
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            {/* should map over types to make checkboxes */}

            {this.props.categories.map(category => (
              <div key={category.id}>
                <input
                  type="checkbox"
                  name="filter"
                  value={category.type}
                  onChange={this.handleChange}
                />
                <label htmlFor={category.type}>
                  {category.type[0].toUpperCase() + category.type.slice(1)}
                </label>
              </div>
            ))}

            <button type="submit">Submit</button>
          </fieldset>
        </form>
      </div>
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
    // getFilteredBeers: (filterObj, beers) => dispatch(filterBeers(filterObj, beers))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerFilter)
