import React from 'react'
import {updateBeer} from '../store/beers'
import {connect} from 'react-redux'

class UpdateBeer extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      type: '',
      ibu: '',
      color: '',
      description: '',
      imageUrl: '',
      quantity: '',
      price: ''
    }
  }
  handleSubmit(event) {
    event.preventDefault()

    const beerId = event.target.action // Need to find beerId
    const updatedBeer = {
      name: this.state.name,
      type: this.state.type,
      ibu: this.state.ibu,
      color: this.state.color,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      quantity: this.state.quantity,
      price: this.state.price
    }
    this.props.updateBeer(beerId, updatedBeer)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div>
        <h1>Edit Beer</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <span>
              <p>Beer Name</p>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </span>
            <span>
              <p>IBU</p>
              <input
                type="number"
                name="ibu"
                min="0"
                max="100"
                value={this.state.ibu}
                onChange={this.handleChange}
              />
            </span>
            <span>
              <p>Beer Color</p>
              <select
                name="color"
                value={this.state.color}
                onChange={this.handleChange}
              >
                <option value="">Select a beer color</option>
                <option value="">Light</option>
                <option value="">Dark</option>
                <option value="">Red</option>
                <option value="b">Brown</option>
              </select>
            </span>
            <span>
              <p>Beer Description</p>
              <input
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </span>
            <span>
              <p>Beer Image</p>
              <select
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={this.handleChange}
              >
                <option value="">Select a beer image</option>
                <option value="../../public/images/bad-mam-yama.jpg">
                  Bad Mama Yama
                </option>
                <option value="../../public/images/dark-paradise.jpg">
                  Dark Paradise
                </option>
                <option value="../../public/images/default-beer.jpg">
                  Default Beer
                </option>
                <option value="../../public/images/hi-honey.jpg">
                  Hi Honey
                </option>
                <option value="../../public/images/hibiscus-saison.jpg">
                  Hibiscus Saison
                </option>
                <option value="../../public/images/wedding-saison.jpg">
                  Wedding Saison
                </option>
              </select>
            </span>
            <span>
              <p>Beer Quantity</p>
              <input
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </span>
            <span
              type="number"
              name="price"
              value={this.state.price}
              onChange={this.handleChange}
            />
            <span>
              <p>
                <button type="submit">Update</button>
              </p>
            </span>
            <p type="button">Delete</p>
          </div>
        </form>
      </div>
    )
  }
}

//Need thunks written in store/redux
const mapDispatch = dispatch => {
  return {
    updateBeer: (beerId, updatedBeer) =>
      dispatch(updateBeer(beerId, updatedBeer)),
    deleteBeer: beerId => dispatch(deleteBeer(beerId))
  }
}

export default connect(null, mapDispatch)(UpdateBeer)
