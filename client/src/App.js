import React, { useEffect } from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import { init } from "./utils/SocketApi";

const App = () => {
	useEffect(() => {
		init();
	}, []);

	return (
		<>
			<Header />
			<Login />
		</>
	);
};

export default App;
