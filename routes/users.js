const auth = require('../middleware/auth');
// const jwt = require('jsonwebtoken');
// const config = require('config');
const { User, validate } = require('../models/User');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.send(user);
});

router.post('/', async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(404).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	user = new User(
		_.pick(req.body, ['firstName', 'lastName', 'email', 'password'])
	);

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();
	res
		.header('x-auth-token', token)
		.header('access-control-expose-headers', 'x-auth-token')
		.send(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));

	// res.status(error.response.status);
	// return res.send(error.message);
});

module.exports = router;
