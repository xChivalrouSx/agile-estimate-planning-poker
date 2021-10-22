import React from "react";

const Header = () => {
	return (
		<nav className="navbar navbar-dark bg-primary">
			<div className="container-fluid">
				<span className="navbar-brand">Agile-Estimate-Planning-Poker</span>
				<button type="button" className="btn btn-danger d-flex">
					Logout
				</button>
			</div>
		</nav>
	);
};

export default Header;
