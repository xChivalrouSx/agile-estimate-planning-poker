import { createSlice, nanoid } from "@reduxjs/toolkit";
import { CreateRoom, SelectCard } from "../../utils/SocketApi";

const initialUser = {
	id: "",
	username: "",
	userColor: "",
	isAdmin: false,
	selectedCard: "",
	roomId: "",
};

const initialRoom = {
	id: "",
	showCards: false,
	cards: [],
	issues: [],
	users: [],
	location: { top: 0, left: 0 },
};

const SaveUserToLocalStorage = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: initialUser,
		room: initialRoom,
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
		setUserId: (state, action) => {
			const userId = action.payload;

			if (userId === "") {
				state.user = { ...initialUser };
			} else {
				state.user.roomId = userId;
			}
		},
		setUserRoomId: (state, action) => {
			state.user = { ...state.user, roomId: action.payload };
		},
		setSelectedCard: (state, action) => {
			const card = action.payload.card;
			state.user.selectedCard = card;
			SelectCard(
				state.room.id,
				state.user.id,
				card,
				action.payload.roomSetter
			);
		},
		createRoom: {
			reducer: (state, action) => {
				const createdRoom = action.payload.room;

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
							showCards: false,
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
		leaveRoom: (state) => {
			state.room = { ...initialRoom };
			state.user.roomId = "";
			state.user.selectedCard = "";
			state.user.isAdmin = false;
		},
	},
});

export default userSlice.reducer;
export const {
	createUser,
	setUser,
	createRoom,
	setRoom,
	setUserRoomId,
	setUserId,
	setSelectedCard,
	leaveRoom,
} = userSlice.actions;
