import React from 'react'
import {postBeerThunk} from '../store/allBeers'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class AddBeer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.beer.name,
      type: this.props.beer.type,
      ibu: this.props.beer.ibu,
      color: this.props.beer.color,
      description: this.props.beer.description,
      imageUrl: this.props.beer.imageUrl,
      quantityInv: this.props.beer.quantityInv,
      price: this.props.beer.price,
      success: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log('event.target', event.target)
    this.setState({
      [event.target.name]: event.target.value,
      success: false
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    // fetch updated robot
    console.log('STATE', this.state)
    this.state.id = this.props.beer.id

    const updatedBeer = {
      id: this.props.beer.id,
      name:
        typeof this.state.name === 'string'
          ? this.state.name
          : this.props.beer.name,
      type: this.state.type,
      ibu:
        typeof this.state.ibu === 'string'
          ? Number(this.state.ibu)
          : Number(this.props.beer.ibu),
      color:
        typeof this.state.color === 'string'
          ? this.state.color
          : this.props.beer.color,
      description:
        typeof this.state.description === 'string'
          ? this.state.description
          : this.props.beer.description,
      imageUrl:
        typeof this.state.imageUrl === 'string'
          ? this.state.imageUrl
          : this.props.beer.imageUrl,
      quantityInv:
        typeof this.state.quantityInv === 'string'
          ? Number(this.state.quantityInv)
          : Number(this.props.beer.quantityInv),
      price:
        typeof this.state.price === 'string'
          ? Number(this.state.price)
          : Number(this.props.beer.price)
    }

    await this.props.postBeerThunk(updatedBeer)
    this.setState({
      success: true
    })
  }

  render() {
    // pull form variables from state -- check this

    console.log('PROPS', this.props)
    console.log('STATE', this.state)

    return (
      <div>
        <h1>Create New Beer</h1>
        <img
          src="https://png.pngtree.com/png-vector/20190417/ourlarge/pngtree-beer-mug-logo-vector-design-illustration-png-image_948978.jpg"
          className="highlight"
        />
        <form onSubmit={this.handleSubmit}>
          <div>
            <span>
              <p>Beer Name (required field)</p>
              <input
                type="text"
                name="name"
                value={
                  typeof this.state.name === 'string'
                    ? this.state.name
                    : this.props.beer.name
                }
                onChange={this.handleChange}
              />
            </span>

            <br />

            <span>
              <p>IBU</p>
              <input
                type="number"
                name="ibu"
                min="0"
                max="100"
                value={
                  typeof this.state.ibu === 'string'
                    ? this.state.ibu
                    : this.props.beer.ibu
                }
                onChange={this.handleChange}
              />
            </span>

            <br />

            <span>
              <p>Beer Color</p>
              <select
                name="color"
                value={
                  typeof this.state.color === 'string'
                    ? this.state.color
                    : this.props.beer.color
                }
                onChange={this.handleChange}
              >
                <option value="">select a beer color</option>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="red">red</option>
                <option value="brown">brown</option>
              </select>
            </span>

            <br />

            <span>
              <p>Beer Description</p>
              <input
                type="text"
                name="description"
                value={
                  typeof this.state.description === 'string'
                    ? this.state.description
                    : this.props.beer.description
                }
                onChange={this.handleChange}
              />
            </span>

            <br />

            <span>
              <p>Beer Image</p>
              <select
                name="imageUrl"
                value={
                  typeof this.state.imageUrl === 'string'
                    ? this.state.imageUrl
                    : this.props.beer.imageUrl
                }
                onChange={this.handleChange}
              >
                <option value="">select a beer image</option>
                <option value="/images/bad-mama-yama.jpg">Bad Mama Yama</option>
                <option value="/images/dark-paradise.jpg">Dark Paradise</option>
                <option value="./images/default-beer.jpg">Default Beer</option>
                <option value="/images/hi-honey.jpg">Hi Honey</option>
                <option value="/images/hibiscus-saison.jpg">
                  Hibiscus Saison
                </option>
                <option value="/images/wedding-saison.jpg">
                  Wedding Saison
                </option>
              </select>
            </span>

            <br />

            <span>
              <p>Beer Quantity Inventory</p>
              <input
                type="number"
                min="0"
                name="quantityInv"
                value={
                  typeof this.state.quantityInv === 'string'
                    ? this.state.quantityInv
                    : this.props.beer.quantityInv
                }
                onChange={this.handleChange}
              />
            </span>

            <br />

            <span>
              <p>Beer Price (required field)</p>
              <input
                type="number"
                name="price"
                min="0"
                value={
                  typeof this.state.price === 'string'
                    ? this.state.price
                    : this.props.beer.price
                }
                onChange={this.handleChange}
              />
            </span>

            <br />

            <span>
              <p>
                <button type="submit">Add Beer</button>
                {this.state.success && <div>Added!</div>}
              </p>
            </span>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    beer: state.singleBeer
  }
}

const mapDispatchToProps = dispatch => ({
  postBeerThunk: newBeer => dispatch(postBeerThunk(newBeer))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddBeer))
