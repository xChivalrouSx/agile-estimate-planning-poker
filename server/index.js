const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

// id,
// showCards,
// cards, 				-> Array
// issues,				-> Array
//		- id
//		- storyPoint
//		- selections	-> Array
//			- userId
//			- selectedCard
// users, 				-> Array
// 	- id,
// 	- username,
// 	- userColor,
// 	- isAdmin,
//		- selectedCard,
// 	- roomId, (No Need On Server)
//		- location
var rooms = [];

const userRoomLocations = [
	{ top: -120, left: 125 },
	{ top: -120, left: 225 },
	{ top: -120, left: 325 },
	{ top: -120, left: 425 },
	{ top: 255, left: 125 },
	{ top: 255, left: 225 },
	{ top: 255, left: 325 },
	{ top: 255, left: 425 },
	{ top: -50, left: -70 },
	{ top: 170, left: -70 },
	{ top: -50, left: 600 },
	{ top: 170, left: 600 },
];

io.on("connection", (socket) => {
	console.log("New user connected...");

	socket.on("disconnect", () => {
		console.log("User disconnected...");
	});

	socket.on("createRoom", (room) => {
		if (!IsRoomInList(room.id)) {
			rooms.push(room);
		}
	});

	socket.on("removeRoom", (roomId) => {
		if (IsRoomInList(room.id)) {
			rooms = rooms.filter((room) => {
				return room.id !== roomId;
			});
		}
	});

	socket.on("joinRoom", ({ roomId, user }) => {
		if (IsRoomInList(roomId)) {
			const roomInfo = GetRoomInfo(roomId);
			if (!IsUserInRoom(roomInfo, user.id)) {
				user.location = GetLocationForUser(roomInfo.users);
				roomInfo.users.push(user);
			}
			io.emit("roomInfo_" + roomId, roomInfo);
		}
	});

	socket.on("leaveRoom", ({ roomId, userId }) => {
		if (IsRoomInList(roomId)) {
			const roomInfo = GetRoomInfo(roomId);
			if (IsUserInRoom(roomInfo, user.id)) {
				roomInfo.users = roomInfo.users.filter((user) => {
					return user.id !== userId;
				});
			}
			io.emit("roomInfo_" + roomId, roomInfo);
		}
	});

	socket.on("addIssue", ({ roomId, issue }) => {
		if (IsRoomInList(roomId)) {
			const roomInfo = GetRoomInfo(roomId);
			if (!IsIssueInRoom(roomInfo, issue.id)) {
				roomInfo.issues.push(issue);
			}
			io.emit("roomInfo_" + roomId, roomInfo);
		}
	});

	socket.on("removeIssue", ({ roomId, issueId }) => {
		if (IsRoomInList(roomId)) {
			const roomInfo = GetRoomInfo(roomId);
			if (IsIssueInRoom(roomInfo, issue.id)) {
				roomInfo.issues = roomInfo.issues.filter((issue) => {
					return issue.id !== issueId;
				});
			}
			io.emit("roomInfo_" + roomId, roomInfo);
		}
	});

	socket.on("selectCard", ({ roomId, userId, card }) => {
		if (IsRoomInList(roomId)) {
			const roomInfo = GetRoomInfo(roomId);
			if (IsUserInRoom(roomInfo, userId)) {
				GetUserInfo(roomInfo, userId).selectedCard = card;
			}
			io.emit("roomInfo_" + roomId, roomInfo);
		}
	});

	socket.on("showCard", ({ roomId, showCardValue }) => {
		if (IsRoomInList(roomId)) {
			const roomInfo = GetRoomInfo(roomId);
			roomInfo.showCards = showCardValue;
			io.emit("roomInfo_" + roomId, roomInfo);
		}
	});
});

http.listen(3001, () => console.log("Server is up..."));

const IsRoomInList = (roomId) => {
	return rooms.some((room) => {
		return room.id === roomId;
	});
};

const IsUserInRoom = (roomInfo, userId) => {
	return roomInfo.users.some((user) => {
		return user.id === userId;
	});
};

const IsIssueInRoom = (roomInfo, issueId) => {
	return roomInfo.users.some((user) => {
		return user.id === userId;
	});
};

const GetRoomInfo = (roomId) => {
	return rooms.filter((room) => {
		return room.id === roomId;
	})[0];
};

const GetUserInfo = (roomInfo, userId) => {
	return roomInfo.users.filter((user) => {
		return user.id === userId;
	})[0];
};

const GetLocationForUser = (users) => {
	const notEmptyLocations = users.map((user) => {
		return user.location;
	});
	const emptyLocations = userRoomLocations.filter(
		(x) => !notEmptyLocations.includes(x)
	);
	return emptyLocations[Math.floor(Math.random() * emptyLocations.length)];
};
