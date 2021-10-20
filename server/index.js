const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

io.on("connection", (socket) => {
	console.log("New user connected...");

	socket.on("disconnect", () => {
		console.log("User left...");
	});
});

http.listen(3001, () => console.log("Server is up..."));
