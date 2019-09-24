import React from 'react'
import {connect} from 'react-redux'
import {toDollars, getBeers, sortBeers, searchBeers} from '../store/allBeers'
import {Link} from 'react-router-dom'
import BeerFilter from './BeerFilter'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import Accordion from 'react-bootstrap/Accordion'

export class AllBeers extends React.Component {
  constructor() {
    super()
    this.state = {
      showFilter: false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleFilter = () => {
    let hidden = this.state.showFilter
    this.setState({
      showFilter: !hidden
    })
  }
  handleChange(event) {
    const beers = !this.props.location.search
      ? this.props.beers
      : this.props.searchedBeers
    console.log('BEERRRSSS: ', beers)
    return this.props.getSortedBeers(event.target.value, beers)
  }
  componentDidMount() {
    const search = this.props.location.search
    if (search) {
      const name = search.split('=')[1]
      this.props.fetchSearchedBeers(name)
    }
  }

  render() {
    const beers = !this.props.location.search
      ? this.props.beers
      : this.props.searchedBeers
    return (
      <Container>
        <Row className="options justify-content-space-between">
          <Col>
            <Button
              variant="outline-dark"
              onClick={this.handleFilter}
              className="mx-5 rounded-sm"
            >
              Filter Products
            </Button>
            {this.state.showFilter && <BeerFilter beers={beers} />}
          </Col>
          <Col className="justify-content-end ml-5 mr-0">
            <select onChange={this.handleChange}>
              <option value="">Sort By...</option>
              <option value="priceHighToLow">Price (high to low)</option>
              <option value="priceLowToHigh">Price (low to high)</option>
              <option value="name">Name</option>
            </select>
          </Col>
        </Row>
        {this.props.beers.length ? (
          <Row>
            <ul>
              {beers.map(beer => (
                <Col key={beer.id} className="m-3">
                  <Link to={`/beer/${beer.id}`}>
                    <li>
                      <div className="highlight">
                        <img src={beer.imageUrl} />
                      </div>
                      <div className="details">
                        <h3>{beer.name}</h3>
                        <div>{toDollars(beer.price)}</div>
                      </div>
                    </li>
                  </Link>
                </Col>
              ))}
            </ul>
          </Row>
        ) : (
          <button type="submit" onClick={this.props.fetchInitialBeers}>
            How embarassing... no more beers like that. Take me to your leader!
          </button>
        )}
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    beers: state.allBeers,
    searchedBeers: state.searchedBeers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSortedBeers: (sortBy, beers) => dispatch(sortBeers(sortBy, beers)),
    fetchInitialBeers: () => dispatch(getBeers()),
    fetchSearchedBeers: search => dispatch(searchBeers(search))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBeers)
