import React from "react";
import { XCircleFill } from "react-bootstrap-icons";

const PlanningRoomInfo = ({ roomUsers, roomId }) => {
	const GetRoomOwner = () => {
		const adminUser = roomUsers.filter((user) => {
			return user.isAdmin;
		})[0];
		return adminUser?.username ?? "";
	};

	return (
		<div className="card text-center">
			<div className="card-header d-flex justify-content-center align-items-center">
				Planning Room (Created by {GetRoomOwner()}) - {roomId}
				<XCircleFill
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
