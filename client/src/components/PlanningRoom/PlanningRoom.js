import React from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomCards from "./RoomCards";
import RoomInfo from "./RoomInfo";
import RoomTable from "./RoomTable";

const PlanningRoom = ({ roomSetter }) => {
	const dispatch = useDispatch();
	const { user, room } = useSelector((state) => state.user);

	return (
		<>
			<RoomInfo roomUsers={room.users} roomId={room.id} />
			<RoomTable roomInfo={room} />
			<RoomCards cardValues={room.cards} roomSetter={roomSetter} />
		</>
	);
};

export default PlanningRoom;
