import React from "react";
import { useDispatch } from "react-redux";
import { leaveRoom } from "../../redux/user/userSlice";
import { LeaveRoom } from "../../utils/SocketApi";

const PlanningRoomInfo = ({ roomUsers, roomId, userId }) => {
	const dispatch = useDispatch();

	const GetRoomOwner = () => {
		const adminUser = roomUsers.filter((user) => {
			return user.isAdmin;
		})[0];
		return adminUser?.username ?? "";
	};

	const ClickLeaveRoom = () => {
		LeaveRoom(roomId, userId);
		dispatch(leaveRoom());
	};

	return (
		<div className="card text-center">
			<div className="card-header d-flex justify-content-center align-items-center">
				Planning Room (Created by {GetRoomOwner()}) - {roomId}
				<button
					type="button"
					className="btn btn-danger d-flex ms-3"
					onClick={ClickLeaveRoom}
				>
					Leave From Room
				</button>
			</div>
		</div>
	);
};

export default PlanningRoomInfo;
