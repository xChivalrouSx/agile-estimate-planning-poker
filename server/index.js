const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

// id,
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
var rooms = [];

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
