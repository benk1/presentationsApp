import React from 'react';

import { Redirect, Link } from 'react-router-dom';

function InfoComponent() {
	return (
		<div>
			<div className="info">
				<h2>Only Admin can delete presentations!</h2>
				<h3>
					<Link to="login">Go to Login Page</Link>
				</h3>
			</div>
		</div>
	);
}

export default InfoComponent;
