import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import Login from "./components/Login";
import WaitingRoom from "./components/WaitingRoom";
import { setUser } from "./redux/user/userSlice";
import { init } from "./utils/SocketApi";

const App = () => {
	const dispatch = useDispatch();
	const { hasUser, hasRoom } = useSelector((state) => state.user);

	useEffect(() => {
		init();
		const storedUser = JSON.parse(localStorage.getItem("user"));
		dispatch(setUser(storedUser));
	}, []); // eslint-disable-line

	return (
		<>
			<Header />
			{!hasUser && <Login />}
			{hasUser && !hasRoom && <WaitingRoom />}
			{hasUser && hasRoom && <div>Room</div>}
		</>
	);
};

export default App;
