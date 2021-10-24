import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./components/Login";
import WaitingRoom from "./components/WaitingRoom";
import { setRoom, setUser } from "./redux/user/userSlice";
import { init, JoinRoom } from "./utils/SocketApi";

const App = () => {
	const dispatch = useDispatch();
	const [roomInfo, setRoomInfo] = useState();
	const { hasUser, hasRoom, room, user } = useSelector((state) => state.user);

	useEffect(() => {
		init();
		const storedUser = JSON.parse(localStorage.getItem("user"));
		if (storedUser !== null) {
			dispatch(setUser(storedUser));
			if (storedUser.roomId !== "") {
				JoinRoom(storedUser.roomId, setRoomInfo);
			}
		}
	}, []); // eslint-disable-line

	useEffect(() => {
		if (roomInfo !== undefined) {
			dispatch(
				setRoom({
					roomId: roomInfo.id,
					roomCards: roomInfo.cards,
					roomIssues: roomInfo.roomIssues,
					roomUsers: roomInfo.roomUsers,
				})
			);
		}
	}, [roomInfo]); // eslint-disable-line

	console.log("user: ");
	console.log(user);
	console.log("room: ");
	console.log(room);

	return (
		<>
			<Header />
			{!hasUser && <Login />}
			{hasUser && !hasRoom && <WaitingRoom roomSetter={setRoomInfo} />}
			{hasUser && hasRoom && <div>Room</div>}
		</>
	);
};

export default App;
