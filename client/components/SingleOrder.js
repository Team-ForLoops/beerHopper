import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleOrder} from '../store/singleOrder'

class SingleOrder extends Component {
  constructor() {
    super()
  }

  handleChange = event => {
    //update the state with input fields
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  componentDidMount() {
    console.log('this beer', this.props)
    this.props.loadSingleOrder(this.props)
  }
  handleSubmit = () => {}
  render() {
    return (
      <div>
        <div>Hello There</div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.singleOrder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleOrder: orderId => dispatch(getSingleOrder(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
