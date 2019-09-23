import React, {Component} from 'react'
import {Form, Field, reduxForm} from 'redux-form'
import {TextField} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

class SimpleForm extends Component {
  render() {
    const {handleSubmit, valid, submitting, onSubmit} = this.props

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field
          name="firstName"
          hintText="First Name"
          component={TextField}
          fullWidth
        />
        <Field
          name="lastName"
          hintText="Last Name"
          component={TextField}
          fullWidth
        />
        <RaisedButton
          label="Submit"
          type="submit"
          disabled={valid || submitting}
        />
      </Form>
    )
  }
}

function validate(form) {
  const errors = {}
  if (!form.firstName) {
    errors.firstName = 'required'
  }

  return errors
}

export default reduxForm({form: 'simple-form', validate})(SimpleForm)
