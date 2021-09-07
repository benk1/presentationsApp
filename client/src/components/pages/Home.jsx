import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
	return (
		<React.Fragment>
			<h3> Welcome to Presentations Application Home Page</h3>
			<h5>
				This is Presentations Management Application, It is designed that you
				can manage your presentations in an Organisation,Enterprise or school.
				Authenticated user can  add presentation and edit the presentation. Only Admin user can delete the presentation,while a guest user
				can just view presentations before Sign up where he/she can have privilege as mentioned above. Assessment of your
				presentation will be done by evaluator by filling specific form
				requirements in Add presentation form Link..
			</h5>
			<h3>
				Please click the link below to check out current Presentations in our
				database
			</h3>
			<div className="jumbotron text-center">
				<NavLink className="badge badge-primary " to="/presenters">
					Check Presentations
				</NavLink>
			</div>
		</React.Fragment>
	);
};

export default Home;