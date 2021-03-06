import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaveRoom, setUserId } from "../../redux/user/userSlice";
import { LeaveRoom } from "../../utils/SocketApi";

const Header = () => {
	const dispatch = useDispatch();
	const { user, room } = useSelector((state) => state.user);
	const hasUser = user.id !== "";

	const OnLogoutClick = () => {
		LeaveRoom(room.id, user.id);
		dispatch(leaveRoom());

		localStorage.removeItem("user");
		dispatch(setUserId(""));
	};

	return (
		<nav className="navbar navbar-dark bg-primary">
			<div className="container-fluid">
				<span className="navbar-brand">Agile-Estimate-Planning-Poker</span>

				<div className="d-flex align-items justify-content-center text-center">
					{hasUser && (
						<>
							<div className="card border-0">
								<ul className="list-group list-group-flush">
									<li className="list-group-item bg-success text-light">
										Logged in as {user.username}.
									</li>
								</ul>
							</div>
							<button
								type="button"
								className="btn btn-danger d-flex ms-3"
								onClick={OnLogoutClick}
							>
								Logout
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Header;
