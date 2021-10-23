import { createSlice, nanoid } from "@reduxjs/toolkit";
import { LoginUser } from "../../utils/SocketApi";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		user: {
			id: "",
			username: "",
			userColor: "",
		},
		hasUser: false,
		room: {
			id: "",
			isAdmin: false,
		},
		hasRoom: false,
	},
	reducers: {
		setRoom: {
			reducer: (state, action) => {
				const userRoom = action.payload;
				state.room = { ...userRoom };
				state.hasRoom = true;
			},
			prepare: ({ roomId, isAdmin }) => {
				return {
					payload: {
						id: roomId ?? nanoid(),
						roomType: isAdmin,
					},
				};
			},
		},
		setUser: {
			reducer: (state, action) => {
				const createdUser = action.payload;
				state.user = { ...createdUser };
				state.hasUser = true;

				LoginUser(createdUser);
				localStorage.setItem("user", JSON.stringify(createdUser));
			},
			prepare: (userInfo) => {
				return {
					payload: {
						id: userInfo.id ?? nanoid(),
						username: userInfo.username,
						userColor: userInfo.userColor,
					},
				};
			},
		},
	},
});

export const { setUser, setRoom } = userSlice.actions;
export default userSlice.reducer;
