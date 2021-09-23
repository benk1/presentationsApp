import React, { Component } from 'react';
import Form from './common/Form';
import Joi from 'joi-browser';
import { register } from '../services/userService';
import auth from '../services/authService';
import * as userService from '../services/userService';
import { getCurrentUser } from '../services/authService';
import { Redirect } from 'react-router-dom';

class SignUp extends Form {
	state = {
		data: { username: '', password: '', firstName: '', lastName: '' },
		errors: {},
	};

	schema = {
		username: Joi.string().required().email().label('Username'),
		password: Joi.string().required().min(5).label('Password'),
		firstName: Joi.string().required().label('First Name'),
		lastName: Joi.string().required().label('Last Name'),
	};

	doSubmit = async () => {
		console.log('Register Form submitted');
		try {
			const response = await userService.register(this.state.data);
			console.log('Res', response);
			auth.loginWithJwt(response.headers['x-auth-token']);

			// this.props.history.push('/');
			window.location = '/';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.username = ex.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div>
				<h1>SignUp</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('firstName', 'First Name')}
					{this.renderInput('lastName', 'Last Name')}
					{this.renderButton('SignUp')}
				</form>
			</div>
		);
	}
}

export default SignUp;
