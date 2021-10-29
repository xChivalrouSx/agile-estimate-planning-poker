import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./components/Login";
import PlanningRoom from "./components/PlanningRoom";
import WaitingRoom from "./components/WaitingRoom";
import { setRoom, setUser, setUserRoomId } from "./redux/user/userSlice";
import { init, JoinRoom } from "./utils/SocketApi";

const App = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const hasUser = user.id !== "";
	const hasRoom = user.roomId !== "";

	const [userRoom, setUserRoom] = useState(-1);

	useEffect(() => {
		init();
		const localUser = JSON.parse(localStorage.getItem("user"));
		if (localUser !== null) {
			dispatch(setUser(localUser));

			if (localUser.roomId !== "") {
				JoinRoom(localUser.roomId, user, setUserRoom);
			}
		}
	}, []); // eslint-disable-line

	useEffect(() => {
		if (userRoom === undefined) {
			dispatch(setUserRoomId(""));
		} else if (userRoom !== -1) {
			dispatch(setUserRoomId(userRoom.id));
			dispatch(setRoom(userRoom));
		}
	}, [userRoom]); // eslint-disable-line

	return (
		<>
			<Header />
			{!hasUser && <Login />}
			{hasUser && !hasRoom && <WaitingRoom roomSetter={setUserRoom} />}
			{hasUser && hasRoom && <PlanningRoom roomSetter={setUserRoom} />}
		</>
	);
};

export default App;
