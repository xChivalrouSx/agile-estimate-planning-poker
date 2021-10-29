import React from "react";
import { XCircleFill } from "react-bootstrap-icons";
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
				<XCircleFill
					onClick={ClickLeaveRoom}
					style={{ cursor: "pointer" }}
					className="ms-3"
					size={24}
					color="red"
				/>
			</div>
		</div>
	);
};

export default PlanningRoomInfo;
