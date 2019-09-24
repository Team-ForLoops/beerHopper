import React from 'react'
import {connect} from 'react-redux'
import {getUsers, deleteUserThunk} from '../store/allUsers'
import {updateUserThunk, fetchSingleUser} from '../store/singleUser'
// Status Filter import BeerFilter from './BeerFilter'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {UncontrolledCollapse} from 'reactstrap'

export class AllUsers extends React.Component {
  constructor() {
    super()
    this.state = {
      showForm: false,
      stat: ''
    }
    this.clickHandlerOne = this.clickHandlerOne.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    this.props.fetchInitialUsers()
  }

  clickHandlerOne() {
    let hidden = this.state.showForm
    this.setState({
      showForm: !hidden
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(userId) {
    event.preventDefault()

    const updatedUser = {
      id: userId,
      isAdmin: this.state.stat
    }
    await this.props.updateUserThunk(updatedUser)
    await this.props.loadSingleUser(userId)
    await this.props.fetchInitialUsers()
  }

  handleDelete(userId) {
    event.preventDefault()

    this.props.deleteUserThunk(userId)
  }

  render() {
    const users = this.props.users || []

    return (
      <div>
        <div className="flex-cards">
          {users.map(user => (
            <Card style={{width: '18rem'}} key={user.id}>
              <div>
                <Button
                  id={`delete${user.id}`}
                  variant="danger"
                  onClick={() => this.handleDelete(user.id)}
                >
                  X
                </Button>
              </div>

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
                          <p>Admin Status: {user.isAdmin ? 'true' : 'false'}</p>
                          <p>
                            Created Date:{' '}
                            {new Intl.DateTimeFormat('en-GB', {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric'
                            }).format(new Date(user.createdAt))}
                          </p>
                          <p />
                          <Button
                            id={`user${user.id}`}
                            onClick={() => {
                              this.clickHandlerOne()
                            }}
                            variant="outline-info"
                          >
                            Admin Status Toggle
                          </Button>
                          <UncontrolledCollapse toggler={`#user${user.id}`}>
                            <form onSubmit={() => this.handleSubmit(user.id)}>
                              <div>
                                <span>
                                  <select
                                    name="stat"
                                    value={this.state.isAdmin}
                                    onChange={this.handleChange}
                                  >
                                    <option value="">user isAdmin?</option>
                                    <option value="true">true</option>
                                    <option value="false">false</option>
                                  </select>
                                </span>

                                <div>
                                  {/* */}
                                  <button type="submit">Submit</button>
                                </div>
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
    users: state.allUsers,
    singleUser: state.singleUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleUser: id => dispatch(fetchSingleUser(id)),
    updateUserThunk: updatedUser => dispatch(updateUserThunk(updatedUser)),
    //getSortedBeers: (sortBy, beers) => dispatch(sortBeers(sortBy, beers)),
    fetchInitialUsers: () => dispatch(getUsers()),
    deleteUserThunk: userId => dispatch(deleteUserThunk(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
