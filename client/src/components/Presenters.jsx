
import React, { Component } from 'react';
// import axios from 'axios';
import Presenter from './Presenter';
import { NavLink } from 'react-router-dom';
//import Like from './common/Like';
//import jwtDecode from 'jwt-decode';
class Presenters extends Component {
	state = {};

	renderPresenters = () => {
		let presenters = this.props.presenters;
		return presenters.map((presenter, index) => {
			// console.log('PRESENTER IN', presenter._id);
			return (
				<>
					<Presenter
						key={presenter._id}
						presenter={presenter}
						onView={
							this.props.onView //getPresentersFromServer={this.props.getPresentersFromServer}
						}
						onDelete={
							this.props.onDelete //onDelete={this.handleDelete}
						}
						onEdit={this.props.onEdit}
						index={
							index //onUpdate={this.props.onUpdate}
						}
						onHandleToggle={() => this.props.onHandleToggle(presenter)}
						onCount={() => this.props.onCount(presenter._id)}
						liked={presenter._id}
						count={this.props.count}
					/>
				</>
			);
		});
	};
	
	onSort = (path) => {};

	render() {
		const { onSort, presenters, user } = this.props;
		if (presenters.length === 0)
			return <p>There are no Presentations in the database</p>;
		return (
			<div className='form-container'>
				<div className='showNumberOfPresentations'>
					<b>Showing {presenters.length} presentations in the database</b>
				</div>
				<div className='addPresenter'>
					{user && (
						<NavLink
							className='btn btn-primary addPresenter'
							to='/presentation/new'
						>
							Add New Presentation
						</NavLink>
					)}
				</div>

				<table className='table'>
					<thead>
						<tr>
							<th onClick={() => onSort('presenterName')}>Presenter</th>
							<th onClick={() => onSort('	evaluatorName')}> Evaluator</th>
							<th onClick={() => onSort('topic')}>Topic</th>
							<th onClick={() => onSort('articleUrl')}>Article</th>
							<th onClick={() => onSort('presentationDate')}>Date</th>
						</tr>
					</thead>
					{this.renderPresenters()}
				</table>
				<div />
			</div>
		);
	}
}

export default Presenters;