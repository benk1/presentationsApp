//import React, { Component } from 'react';
//import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import Like from './common/Like';
//import { getCurrentUser } from '../services/authService';

const Presenter = ({ presenter, onDelete, onHandleToggle, count, user }) => {
	// console.log('CHECKING', count);

	return (
		<tbody>
			<tr>
				<td>{presenter.presenterName}</td>
				<td>{presenter.evaluatorName}</td>
				<td>{presenter.topic}</td>
				<td>{presenter.articleUrl}</td>
				<td>
					{moment(presenter.presentationDate).utcOffset('800').calendar()}
				</td>
				<button className="item-view">
					<NavLink to={`/presenter/${presenter._id}`}>View</NavLink>
				</button>
				<button className="item-edit">
					{' '}
					<NavLink to={`/presenters/${presenter._id}`}>Edit</NavLink>
				</button>
				<td>
					<Like
						presenter={presenter._id}
						liked={presenter.liked}
						onHandleToggle={() => onHandleToggle(presenter._id)}
						count={count}
					/>
				</td>

				<button className="item-delete" onClick={() => onDelete(presenter)}>
					Delete
				</button>
			</tr>
		</tbody>
	);
};

export default Presenter;
