import React, { Component } from 'react';
import http from '../services/httpService';
import auth from '../services/authService';
class LogOut extends Component {
	async componentDidMount() {
		const { presenters } = this.props;
		console.log('IN LOGOUT', presenters);
		auth.logout();

		// const { data: presenters } = await http.get('/presenters');

		window.location = '/presenters';
	}

	render() {
		const { presenters } = this.props;
		return null;
	}
}

export default LogOut;
