import React from 'react'
import {connect} from 'react-redux'
import {toDollars, getUsers} from '../store/allUsers' // toDate
// import {updateUserThunk, fetchSingleUser} from '../store/singleUser'
// Status Filter import BeerFilter from './BeerFilter'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {UncontrolledCollapse, CardBody} from 'reactstrap'

export class AllUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      isAdmin: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      this.props.fetchInitialUsers()
    } catch (error) {
      console.error(error)
    }
  }

  clickHandlerOne() {
    let hidden = this.state.showForm
    this.setState({
      showForm: !hidden
    })
  }

  handleChange(event) {
    //console.log('event.target', event.target)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(userId) {
    event.preventDefault()

    const updatedUser = {
      id: userId,
      isAdmin: this.state.isAdmin
    }

    // console.log('UPDATE USER', updatedUser)

    await this.props.updateUserThunk(updatedUser)
    this.props.fetchInitialUsers()
  }

  render() {
    const users = this.props.users
    // console.log('PROPS', this.props)
    console.log('USERS', this.props.users)

    return (
      <div>
        {/* <div className="options">
          <select onChange={this.handleChange}>
            <option value="">Sort By...</option>
            <option value="priceHighToLow">Price (high to low)</option>
            <option value="priceLowToHigh">Price (low to high)</option>
            <option value="name">Name</option>
          </select>

          <BeerFilter />
          </div> */}

        <div className="flex-cards">
          {users.map(user => (
            <Card style={{width: '18rem'}} key={user.id}>
              <Card.Body>
                <Card.Title>User Id: {user.id}</Card.Title>
                <Card.Text>
                  <div>
                    <ul>
                      <li>
                        <div className="highlight">
                          <img src={user.imageUrl} />
                        </div>
                        <div className="details">
                          <p>Username: {user.username}</p>
                          <p>User Email: {user.email}</p>
                          <p>Admin Status: {user.isAdmin}</p>
                          <p>Account Created Date: {user.createdAt}</p>
                          <p />
                          <Button
                            id={`user${user.id}`}
                            onClick={() => {
                              this.clickHandlerOne()
                            }}
                            variant="danger"
                          >
                            Admin Status Toggle
                          </Button>
                          <UncontrolledCollapse toggler={`#user${user.id}`}>
                            {/* {this.state.showForm && (
                              <UpdateUserStatus userId={user.id} />
                            )} */}
                            <form onSubmit={() => this.handleSubmit(user.id)}>
                              <div>
                                <span>
                                  <select
                                    name="isAdmin"
                                    value={
                                      typeof user.isAdmin === 'string'
                                        ? this.state.isAdmin
                                        : user.isAdmin
                                    }
                                    onChange={this.handleChange}
                                  >
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                  </select>
                                </span>

                                <p />
                                <span>
                                  <p>
                                    {/* */}
                                    <button type="submit">Submit</button>
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
                          </UncontrolledCollapse>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleUser: id => dispatch(fetchSingleUser(id)),
    updateUserThunk: updatedUser => dispatch(updateUserThunk(updatedUser)),
    //getSortedBeers: (sortBy, beers) => dispatch(sortBeers(sortBy, beers)),
    fetchInitialUsers: () => dispatch(getUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
