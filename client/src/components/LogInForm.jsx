import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Joi from 'joi-browser';
import Form from './common/Form';
import { login, getCurrentUser } from '../services/authService';
class LogInForm extends Form {
	state = {
		data: { username: '', password: '' },

		errors: {},
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password'),
	};

	doSubmit = async () => {
		console.log('Form Login submitted');
		try {
			const { data } = this.state;
			//call the server
			await login(data.username, data.password);
			console.log(this.props);
			const { state } = this.props.location;
			window.location = state ? state.from.pathname : '/';

			// window.location = '/presenters';
		} catch (ex) {
			if (ex.response && ex.response.status === 400) {
				const errors = { ...this.state.errors }; // clone the errors object from the state
				errors.username = ex.response.data; //this will display error from the server
				this.setState({ errors }); // set the errors ES6--keys == values
			}
		}
	};

	render() {
		if (getCurrentUser()) return <Redirect to="/presenters" />;
		return (
			<div>
				<h1>Login</h1>

				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username', 'text', 'Username')}
					{this.renderInput('password', 'Password', 'password', 'Password')}
					{this.renderButton('Login')}
				</form>
			</div>
		);
	}
}

export default LogInForm;
