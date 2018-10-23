import React, {Component} from 'react';
import {Grid, Form, Button} from 'semantic-ui-react'
import Validator from 'validator';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import InlineError from '../layout/InlineError'
import {userLogin} from "../../AC/auth";


class Login extends Component {
	state  = {
		data: {name: '', password: ''},
		errors: {}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.isAuth) {
			this.setState({errors: {}})
			this.props.history.push('/')
		}
		this.setState({errors: nextProps.errors})
	}

	componentDidMount() {
		if(this.props.isAuth) {
			this.props.history.push('/')
		}
	}

	handleChange = ({target}) => {
		this.setState({
			data: {...this.state.data, [target.name]: target.value},
			errors: {...this.state.errors, [target.name]: ''}
		});
	}

	validate = (data) => {
		const errors = {}
		if(Validator.isEmpty(data.name)) errors.name = "Not be blank"
		if(Validator.isEmpty(data.password)) errors.password = "Not be blank"
		return errors;
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.userLogin(this.state.data)
	}

	render(){
		const {data, errors} = this.state;
		const {loading} = this.props;
		return(
			<div className="container ui">
				<Grid centered columns={2}>
					<Grid.Column>
						<h2 className="text-center">Login</h2>
						<Form onSubmit={this.handleSubmit}>
							<Form.Field error={!!errors.name}>
								<label>Name {errors.name && <InlineError text={errors.name}/>}</label>
								<input type="text" name="name"
									value={data.name}
									onChange={this.handleChange}
									/>
							</Form.Field>

							<Form.Field error={!!errors.password}>
								<label>Password {errors.password && <InlineError text={errors.password}/>}</label>
								<input type="text" name="password"
									value={data.password}
									onChange={this.handleChange}
									/>
							</Form.Field>

							<Form.Field>
								<Button loading={loading}
									disabled={loading}
									primary>Login</Button>
							</Form.Field>

						</Form>

					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default connect(
	({errors, auth, login}) => ({
		errors,
		isAuth: auth.isAuth,
		loading: login.loading
	}),
	{userLogin}
)(withRouter(Login));
