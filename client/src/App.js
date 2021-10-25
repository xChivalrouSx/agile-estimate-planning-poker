import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./components/Login";
import PlanningRoom from "./components/PlanningRoom";
import WaitingRoom from "./components/WaitingRoom";
import { setRoom, setUser } from "./redux/user/userSlice";
import { init, JoinRoom } from "./utils/SocketApi";

const App = () => {
	const dispatch = useDispatch();
	const { user, room } = useSelector((state) => state.user);
	const hasUser = user.id !== "";
	const hasRoom = user.roomId !== "";

	const [userRoom, setUserRoom] = useState();

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
		if (userRoom !== undefined) {
			dispatch(setRoom(userRoom));
		}
	}, [userRoom]); // eslint-disable-line

	console.log("user: ");
	console.log(user);
	console.log("room: ");
	console.log(room);

	return (
		<>
			<Header />
			{!hasUser && <Login />}
			{hasUser && !hasRoom && <WaitingRoom roomSetter={setUserRoom} />}
			{hasUser && hasRoom && <PlanningRoom />}
		</>
	);
};

export default App;
