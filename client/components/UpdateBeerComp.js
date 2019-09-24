import React from 'react'
import {updateBeerThunk, fetchSingleBeer} from '../store/singleBeer'
import {getBeers} from '../store/allBeers'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class UpdateBeer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.beer.name,
      type: this.props.beer.categories,
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

  componentDidMount() {
    try {
      this.props.loadSingleBeer(this.props.match.params.beerId).then(res => {})
    } catch (error) {
      console.error(error)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      success: false
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
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

    await this.props.updateBeerThunk(updatedBeer)
    this.props.fetchInitialBeers()
    this.setState({
      success: true
    })
  }

  render() {
    return (
      <div>
        <h1>Edit Beer Details</h1>
        <img src={this.props.beer.imageUrl} className="highlight" />
        <form onSubmit={this.handleSubmit}>
          <div>
            <span>
              <p>Beer Name</p>
              <input
                type="text"
                name="name"
                value={
                  //this.state.name
                  typeof this.state.name === 'string'
                    ? this.state.name
                    : this.props.beer.name
                }
                onChange={this.handleChange}
              />
            </span>
            {/* <span>
              <fieldset>
                {this.props.categories.map(category => (
                  <div key={category.id}>
                    <input
                      type="checkbox"
                      name="filter"
                      value={category.type}
                      onChange={this.handleChecked}
                      checked='off'
                    />
                    <label htmlFor={category.type}>
                      {category.type[0].toUpperCase() + category.type.slice(1)}
                    </label>
                  </div>
                ))}
              </fieldset>
              <AddCategory />
            </span> */}

            <br />

            <span>
              <p>IBU</p>
              <input
                id="hello"
                type="number"
                name="ibu"
                min="0"
                max="100"
                value={
                  //this.state.ibu
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
                // limit min of number selection
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
              <p>Beer Price</p>
              <input
                type="number"
                name="price"
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
                <button type="submit">Edit</button>
                {this.state.success && <div>Updated!</div>}
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
    beer: state.singleBeer,
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => ({
  loadSingleBeer: id => dispatch(fetchSingleBeer(id)),
  updateBeerThunk: updatedBeer => dispatch(updateBeerThunk(updatedBeer)),
  fetchInitialBeers: () => dispatch(getBeers())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateBeer)
)
