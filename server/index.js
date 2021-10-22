const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

var users = [];

io.on("connection", (socket) => {
	console.log("New user connected...");

	socket.on("disconnect", () => {
		console.log("User disconnected...");
	});

	socket.on("loginUser", (user) => {
		if (!isUserInList(user.id)) {
			users.push(user);
		}
	});
});

http.listen(3001, () => console.log("Server is up..."));

const isUserInList = (id) => {
	return users.some((user) => {
		return user.id === id;
	});
};
