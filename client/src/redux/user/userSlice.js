import { createSlice, nanoid } from "@reduxjs/toolkit";
import { CreateRoom } from "../../utils/SocketApi";

const SaveUserToLocalStorage = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {
			id: "",
			username: "",
			userColor: "",
			isAdmin: false,
			selectedCard: "",
			roomId: "",
		},
		room: {
			id: "",
			cards: [],
			issues: [],
			users: [],
		},
	},
	reducers: {
		createUser: {
			reducer: (state, action) => {
				const createdUser = action.payload;
				state.user = { ...createdUser };

				SaveUserToLocalStorage(createdUser);
			},
			prepare: ({ username, userColor }) => {
				return {
					payload: {
						id: nanoid(),
						username: username,
						userColor: userColor,
						isAdmin: false,
						selectedCard: "",
						roomId: "",
					},
				};
			},
		},
		setUser: (state, action) => {
			state.user = { ...action.payload };
		},
		createRoom: {
			reducer: (state, action) => {
				const createdRoom = action.payload.room;
				state.room = { ...createdRoom };

				state.user.roomId = createdRoom.id;
				state.user.isAdmin = true;

				CreateRoom(createdRoom, state.user, action.payload.roomSetter);

				SaveUserToLocalStorage(state.user);
			},
			prepare: ({ cards, roomSetter }) => {
				return {
					payload: {
						room: {
							id: nanoid(),
							cards: cards.split(", "),
							issues: [],
							users: [],
						},
						roomSetter: roomSetter,
					},
				};
			},
		},
		setRoom: (state, action) => {
			state.room = { ...action.payload };
		},
	},
});

export const { createUser, setUser, createRoom, setRoom } = userSlice.actions;
export default userSlice.reducer;
