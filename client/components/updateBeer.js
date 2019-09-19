import React from 'react'
import {updateBeerThunk, fetchSingleBeer} from '../store/singleBeer'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class UpdateBeer extends React.Component {
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
      price: this.props.beer.price
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      console.log('this.props.match.params', this.props)
      this.props.loadSingleBeer(this.props.match.params.beerId).then(res => {
        console.log('res', res)
      })
      //console.log('test', test)
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
    this.state.id = this.props.beer.id

    const updatedBeer = {
      id: this.props.beer.id,
      name: this.state.name,
      type: this.state.type,
      ibu: Number(this.state.ibu),
      color: this.state.color,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      quantityInv: Number(this.state.quantityInv),
      price: Number(this.state.price)
    }

    await this.props.updateBeerThunk(updatedBeer)

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

    console.log('PROPS', this.props)
    console.log('STATE', this.state)

    return (
      <div>
        <h1>Edit Beer</h1>
        <img src={this.props.beer.imageUrl} className="highlight" />
        <form onSubmit={this.handleSubmit}>
          <div>
            <span>
              <p>Beer Name</p>
              <input
                type="text"
                name="name"
                defaultValue={this.props.beer.name}
                value={
                  //this.state.name
                  typeof this.state.name === 'string'
                    ? this.state.name
                    : this.props.beer.name
                }
                onChange={this.handleChange}
              />
            </span>

            <span>
              <p>IBU</p>
              <input
                id="hello"
                type="number"
                defaultValue={this.props.beer.ibu}
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

            <span>
              <p>Beer Color</p>
              <select
                name="color"
                defaultValue={this.props.beer.color}
                value={
                  typeof this.state.color === 'string'
                    ? this.state.color
                    : this.props.beer.color
                }
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
                value={
                  typeof this.state.description === 'string'
                    ? this.state.description
                    : this.props.beer.description
                }
                onChange={this.handleChange}
              />
            </span>

            <span>
              <p>Beer Image</p>
              <select
                name="imageUrl"
                defaultValue={this.props.beer.imageUrl}
                value={
                  typeof this.state.imageUrl === 'string'
                    ? this.state.imageUrl
                    : this.props.beer.imageUrl
                }
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
                value={
                  typeof this.state.quantityInv === 'string'
                    ? this.state.quantityInv
                    : this.props.beer.quantityInv
                }
                onChange={this.handleChange}
              />
            </span>

            <span>
              <p>Beer Price</p>
              <input
                type="number"
                name="price"
                defaultValue={this.props.beer.price}
                value={
                  typeof this.state.price === 'string'
                    ? this.state.price
                    : this.props.beer.price
                }
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
