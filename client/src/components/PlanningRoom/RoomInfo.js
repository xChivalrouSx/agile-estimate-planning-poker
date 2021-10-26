import React from "react";

const PlanningRoomInfo = ({ roomUsers, roomId }) => {
	const GetRoomOwner = () => {
		const adminUser = roomUsers.filter((user) => {
			return user.isAdmin;
		})[0];
		return adminUser?.username ?? "";
	};

	return (
		<div className="card text-center">
			<div className="card-header">
				Planning Room (Created by {GetRoomOwner()}) - {roomId}
			</div>
		</div>
	);
};

export default PlanningRoomInfo;
