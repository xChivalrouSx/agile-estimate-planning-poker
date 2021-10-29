import React from "react";
import { useSelector } from "react-redux";
import RoomCards from "./RoomCards";
import RoomInfo from "./RoomInfo";
import RoomTable from "./RoomTable";

const PlanningRoom = ({ roomSetter }) => {
	const { user, room } = useSelector((state) => state.user);

	return (
		<>
			<RoomInfo roomUsers={room.users} roomId={room.id} userId={user.id} />
			<RoomTable roomInfo={room} roomSetter={roomSetter} />
			<RoomCards cardValues={room.cards} roomSetter={roomSetter} />
		</>
	);
};

export default PlanningRoom;
