import React from 'react'
import {updateOrderThunk, fetchSingleOrder} from '../store/singleOrder'
import {getOrders} from '../store/allOrders'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class UpdateOrderStatus extends React.Component {
  constructor(props) {
    super(props)

    console.log('PROPS INSDIE SUPER', props)

    this.state = {
      status: this.props.order.status
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    try {
      console.log('this.props.match.params', this.props.orderId)
      this.props.loadSingleOrder(this.props.orderId).then(res => {
        // ?
        console.log('res', res)
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleChange(event) {
    console.log('event.target', event.target)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()

    // fetch updated robot
    console.log('STATE', this.state)
    this.state.id = this.props.order.id

    const updatedOrder = {
      id: this.props.order.id,
      status:
        typeof this.state.status === 'string'
          ? this.state.status
          : this.props.order.status
    }

    console.log('UPDATE ORDER', updatedOrder)

    await this.props.updateOrderThunk(updatedOrder)
    this.props.fetchInitialOrders()
  }

  render() {
    // pull form variables from state -- check this

    console.log('PROPS', this.props)
    console.log('STATE', this.state)

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <span>
              <select
                name="status"
                value={
                  typeof this.state.status === 'string'
                    ? this.state.status
                    : this.props.order.status
                }
                onChange={this.handleChange}
              >
                <option value="">select order status</option>
                <option value="open">open</option>
                <option value="processing">processing</option>
                <option value="cancelled">cancelled</option>
              </select>
            </span>

            <p />
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
    order: state.singleOrder
  }
}

const mapDispatchToProps = dispatch => ({
  loadSingleOrder: id => dispatch(fetchSingleOrder(id)),
  updateOrderThunk: updatedOrder => dispatch(updateOrderThunk(updatedOrder)),
  fetchInitialOrders: () => dispatch(getOrders())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UpdateOrderStatus)
)
