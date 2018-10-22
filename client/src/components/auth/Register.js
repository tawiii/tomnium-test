import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import InlineError from '../layout/InlineError'
import {userRegister} from "../../AC/auth";


class Register extends Component {
  state  = {
    data: {name: '', password: '', password2: ''},
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.errors})
  }

  componentDidMount() {
    if(this.props.isAuth) {
      this.props.history.push('/')
    }
  }

  handleChange = ({target}) => this.setState({
    data: {...this.state.data, [target.name]: target.value},
    errors: {...this.state.errors, [target.name]: ''}
  })

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.userRegister(this.state.data, this.props.history);
  }

  render(){
    const {errors, data} = this.state;
    const {loading} = this.props;
    return(
      <div className="container ui">
        <Grid centered columns={2}>
          <Grid.Column>
            <h2 className="text-center">Registration</h2>

            <Form onSubmit={this.handleSubmit}>

              <Form.Field error={!!errors.name}>
                <label>Name {errors.name && <InlineError  text={errors.name}/>}</label>
                <input type="text" name="name"
                  value={data.name}
                  onChange={this.handleChange}
                  />
              </Form.Field>

              <Form.Field error={!!errors.password}>
                <label>Password {errors.password && <InlineError  text={errors.password}/>}</label>
                <input type="text" name="password"
                  value={data.password}
                  onChange={this.handleChange}
                  />
              </Form.Field>

              <Form.Field error={!!errors.password2}>
                <label>Password confirm {errors.password2 && <InlineError  text={errors.password2}/>}</label>
                <input type="text" name="password2"
                  value={data.password2}
                  onChange={this.handleChange}
                  />
              </Form.Field>

              <Form.Field>
                <Button primary
                  loading={loading}
                  disabled={loading}
                  >Register</Button>
              </Form.Field>

            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired,
  userRegister: PropTypes.func.isRequired,
};

export default connect(
  ({auth, errors}) => ({
    isAuth: auth.isAuth,
    loading: auth.loading,
    errors
  }),
  {userRegister}
)(withRouter(Register));
