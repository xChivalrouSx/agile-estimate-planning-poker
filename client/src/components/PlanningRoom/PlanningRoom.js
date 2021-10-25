import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PlanningRoomInfo from "./PlanningRoomInfo";

const PlanningRoom = () => {
	const dispatch = useDispatch();
	const { user, room } = useSelector((state) => state.user);

	return (
		<>
			<PlanningRoomInfo roomUsers={room.users} roomId={room.id} />
		</>
	);
};

export default PlanningRoom;
