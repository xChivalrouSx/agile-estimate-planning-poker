import { createSlice, nanoid } from "@reduxjs/toolkit";
import { CreateRoom, JoinRoom, LoginUser } from "../../utils/SocketApi";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {
			id: "",
			username: "",
			userColor: "",
			roomId: "",
		},
		hasUser: false,
		room: {
			id: "",
			cards: [],
			issues: [],
			users: [],
		},
		hasRoom: false,
		isAdmin: false,
	},
	reducers: {
		setRoom: {
			reducer: (state, action) => {
				const isAdmin = action.payload.isAdmin;
				const userRoom = action.payload.userRoom;
				const currentUser = { ...state.user };
				currentUser.isAdmin = isAdmin ?? false;

				const roomHasUser = userRoom.users.some((userItem) => {
					return userItem.id === state.user.id;
				});

				if (!roomHasUser) {
					userRoom.users.push(currentUser);
				}

				if (!Array.isArray(userRoom.cards)) {
					userRoom.cards = userRoom.cards.split(", ");
				}

				state.room = { ...userRoom };
				state.isAdmin = isAdmin;
				state.hasRoom = true;

				if (isAdmin && action.payload.roomSetter !== undefined) {
					CreateRoom(userRoom, action.payload.roomSetter);
				} else if (action.payload.roomSetter !== undefined) {
					JoinRoom(userRoom.id, action.payload.roomSetter);
				}

				if (userRoom.id) {
					state.user.roomId = userRoom.id;
					localStorage.setItem("user", JSON.stringify(state.user));
				}
			},
			prepare: ({
				roomSetter,
				roomId,
				isAdmin,
				roomCards,
				roomIssues,
				roomUsers,
			}) => {
				return {
					payload: {
						userRoom: {
							id: roomId ?? nanoid(),
							cards: roomCards ?? "",
							issues: roomIssues,
							users: roomUsers,
						},
						roomSetter: roomSetter,
						isAdmin: isAdmin,
					},
				};
			},
		},
		setUser: {
			reducer: (state, action) => {
				const createdUser = action.payload;
				state.user = { ...createdUser };
				state.hasUser = true;
				state.hasRoom = createdUser.roomId !== "";

				LoginUser(createdUser);
				localStorage.setItem("user", JSON.stringify(createdUser));
			},
			prepare: (userInfo) => {
				return {
					payload: {
						id: userInfo.id ?? nanoid(),
						username: userInfo.username,
						userColor: userInfo.userColor,
						roomId: userInfo.roomId ?? "",
					},
				};
			},
		},
	},
});

export const { setUser, setRoom } = userSlice.actions;
export default userSlice.reducer;
