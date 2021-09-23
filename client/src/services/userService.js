import http from './httpService';
//import { apiUrl } from '../config.json';

const apiEndpoint = '/users'; // OR USE THIS IN FUTURE --->	'http://localhost:5000/users';

export function register(user) {
	return http.post(apiEndpoint, {
		email: user.username,
		password: user.password,
		firstName: user.firstName,
		lastName: user.lastName,
	});
}
