import React, { Component } from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import { register } from '../services/userService';
import auth from '../services/authService';
class SignUp extends Form {
	state = {
		data: { username: '', password: '', name: '' },
		errors: {},
	};

	schema = {
		username: Joi.string()
			.required()
			.email()
			.label('Username'),
		password: Joi.string()
			.required()
			.min(5)
			.label('Password'),
		name: Joi.string()
			.required()
			.label('Name'),
	};

	doSubmit = async () => {
		console.log('Register Form submitted');
		//call the server
		try {
			const { data } = this.state;
			const response = await register(data);
			console.log('Res', response);
			auth.loginWithJwt(response.headers['x-auth-token']);
			window.location = '/presenters';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({
					errors,
				});
			}
		}
	};
	render() {
		return (
			<div>
				<h1>SignUp</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username', 'text', 'Username')}
					{this.renderInput('password', 'Password', 'password', 'Password')}
					{this.renderInput('name', 'Name', 'text', 'Name')}
					{this.renderButton('SignUp')}
				</form>
			</div>
		);
	}
}

export default SignUp;