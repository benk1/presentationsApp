import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Header({ user }) {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			{/* <Link className="navbar-brand" to="/">
				Presentations
			</Link> */}

			<div className="collapse navbar-collapse" id="navbarNav ">
				<ul className="navbar-nav">
					<NavLink className="navbar-brand nav-item nav-link" to="/">
						Presentations
					</NavLink>

					<NavLink className="nav-item nav-link" to="/presentation/new">
						AddNewPresentantion
					</NavLink>
					{!user && (
						<>
							<NavLink className="nav-item nav-link" to="/login">
								Login
							</NavLink>

							<NavLink className="nav-item nav-link" to="/signup">
								SignUp
							</NavLink>
						</>
					)}

					{user && (
						<>
							<NavLink className="nav-item nav-link" to="/logout">
								Logout
							</NavLink>

							<button type="button" className="btn btn-primary btn-floating">
								{user.firstName[0].toUpperCase()}
								{user.lastName[0].toUpperCase()}
							</button>
							{/* <NavLink className='nav-item nav-link' to='/profile'>
								{user.name[0].toUpperCase()}
							</NavLink> */}
						</>
					)}
				</ul>
			</div>
		</nav>
	);
}

export default Header;
