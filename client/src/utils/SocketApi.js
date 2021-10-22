import io from "socket.io-client";

var socket;

export const init = () => {
	socket = io("http://localhost:3001", {
		transports: ["websocket"],
	});

	socket.on("connect", () => console.log("Connected..."));
};

export const LoginUser = (user) => {
	socket.emit("loginUser", user);
};
