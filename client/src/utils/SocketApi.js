import io from "socket.io-client";

var socket;

export const init = () => {
	socket = io("http://localhost:3001", {
		transports: ["websocket"],
	});
	socket.on("connect", () => console.log("Connected..."));
};

export const CreateRoom = (room, user, roomSetter) => {
	socket.emit("createRoom", room);
	JoinRoom(room.id, user, roomSetter);
};

export const JoinRoom = (roomId, user, roomSetter) => {
	ListenRoom(roomId, roomSetter);
	socket.emit("joinRoom", { roomId, user });
};

export const SelectCard = (roomId, userId, card, roomSetter) => {
	ListenRoom(roomId, roomSetter);
	socket.emit("selectCard", { roomId, userId, card });
};

export const showCard = (roomId, showCardValue, roomSetter) => {
	ListenRoom(roomId, roomSetter);
	socket.emit("showCard", { roomId, showCardValue });
};

export const ListenRoom = (roomId, roomSetter) => {
	socket.on("roomInfo_" + roomId, (roomInfo) => {
		roomSetter({
			id: roomInfo.id,
			showCards: roomInfo.showCards,
			cards: roomInfo.cards,
			issues: roomInfo.issues,
			users: roomInfo.users,
			location: roomInfo.location,
		});
	});
};
