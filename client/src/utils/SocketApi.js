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

export const CreateRoom = (room, roomSetter) => {
	ListenRoom(room.id, roomSetter);
	socket.emit("createRoom", room);
};

export const JoinRoom = (roomId, roomSetter) => {
	ListenRoom(roomId, roomSetter);
	socket.emit("joinRoom", roomId);
};

export const ListenRoom = (roomId, roomSetter) => {
	socket.on("roomInfo_" + roomId, (roomInfo) => {
		roomSetter({
			id: roomInfo.id,
			cards: roomInfo.cards,
			roomIssues: roomInfo.issues,
			roomUsers: roomInfo.users,
		});
	});
};
