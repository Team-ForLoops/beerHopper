import React from 'react'
import {updateBeerThunk, fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class UpdateBeer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      type: '',
      ibu: '',
      color: '',
      description: '',
      imageUrl: '',
      quantityInv: '',
      price: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      console.log('this.props.match.params', this.props)
      this.props.loadSingleBeer(this.props.match.params.beerId)
    } catch (error) {
      console.error(error)
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    // fetch updated robot
    console.log('STATE', this.state)
    this.state.id = this.props.beer.id // beer
    await this.props.updateBeerThunk(this.state)

    // Uncomment if rest of code runs
    // this.setState({
    //   name: '',
    //   type: '',
    //   ibu: '',
    //   color: '',
    //   description: '',
    //   imageUrl: '',
    //   quantityInv: '',
    //   price: ''
    // })

    /* ********************************************************************************************************************** */

    // Theo Code
    // const beerId = event.target.action // Need to find beerId

    // const updatedBeer = {
    //   name: this.state.name,
    //   type: this.state.type,
    //   ibu: this.state.ibu,
    //   color: this.state.color,
    //   description: this.state.description,
    //   imageUrl: this.state.imageUrl,
    //   quantityInv: this.state.quantityInv,
    //   price: this.state.price
    // }
    // this.props.updateBeer(beerId, updatedBeer)

    /* ********************************************************************************************************************** */
  }

  render() {
    // pull form variables from state -- check this

    console.log('PROPS', this.props.beer.ibu)

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
                defaultValue={this.props.beer.name}
                value={this.state.name}
                onChange={this.handleChange}
              />
            </span>

            <span>
              <p>IBU</p>
              <input
                type="number"
                defaultValue={this.props.beer.ibu}
                name="ibu"
                min="0"
                max="100"
                value={
                  this.state.ibu
                  // typeof this.state.ibu === 'number'
                  //   ? this.state.ibu
                  //   : this.props.beer.ibu
                }
                onChange={this.handleChange}
              />
            </span>

            <span>
              <p>Beer Color</p>
              <select
                name="color"
                defaultValue={this.props.beer.color}
                value={this.state.color}
                onChange={this.handleChange}
              >
                <option value="">Select a beer color</option>
                <option value="light">light</option>
                <option value="dark">dark</option>
                <option value="red">red</option>
                <option value="brown">brown</option>
              </select>
            </span>

            <span>
              <p>Beer Description</p>
              <input
                type="text"
                name="description"
                defaultValue={this.props.beer.description}
                value={this.state.description}
                onChange={this.handleChange}
              />
            </span>

            <span>
              <p>Beer Image</p>
              <select
                name="imageUrl"
                defaultValue={this.props.beer.imageUrl}
                value={this.state.imageUrl}
                onChange={this.handleChange}
              >
                <option value="">Select a beer image</option>
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

            <span>
              <p>Beer Quantity Inventory</p>
              <input
                type="number"
                // limit min of number selection
                name="quantityInv"
                defaultValue={this.props.beer.quantityInv}
                value={this.state.quantityInv}
                onChange={this.handleChange}
              />
            </span>

            <span>
              <p>Beer Price</p>
              <input
                type="number"
                name="price"
                defaultValue={this.props.beer.price}
                value={this.state.price}
                onChange={this.handleChange}
              />
            </span>

            <span>
              <p>
                {/* */}
                <button type="submit">Edit</button>
              </p>
            </span>

            {/* delete thunk
            <span>
              <p>
                <button type="button">Delete</button>
              </p>
            </span>
            */}
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
  loadSingleBeer: id => dispatch(fetchSingleBeer(id)),
  updateBeerThunk: updatedBeer => dispatch(updateBeerThunk(updatedBeer))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateBeer)
)
