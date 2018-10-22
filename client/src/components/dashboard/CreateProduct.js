import React, {Component} from 'react';
import {Grid, Form} from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {createProduct} from "../../AC/product";


class CreateProduct extends Component {

  state  = {
    data: {
      name: '', price: '', description: '',  createdBy: ''
    },
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({errors: nextProps.errors})
    }
  }

  handleChange = (e, {name, value}) => this.setState({
    data: {...this.state.data, [name]: value},
    errors: {...this.state.errors, [name]: ''}
  })

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProduct(this.state.data, this.props.history)
  }

  render(){
    const {data, errors} = this.state;
    return(
      <Grid columns={16} centered>
        <Grid.Column width={14}>
          <h2 className="text-center">Create Product</h2>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">

              <Form.Input  error={!!errors.name} name="name" value={data.name}
                onChange={this.handleChange}
                placeholder="name"
                />
              <Form.Input error={!!errors.price} name="price" value={data.price}
                onChange={this.handleChange}
                placeholder="price"
                />
              <Form.Input error={!!errors.description} name="description" value={data.description}
                onChange={this.handleChange}
                placeholder="description"
                />
            </Form.Group>

            <Form.Field className="text-center">
              <Form.Button color="red">Create Product</Form.Button>
            </Form.Field>
          </Form>

        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  ({errors}) => ({
    errors
  }),
  {createProduct}
)(withRouter(CreateProduct));
