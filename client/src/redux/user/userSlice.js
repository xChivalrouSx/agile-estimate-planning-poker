import { createSlice, nanoid } from "@reduxjs/toolkit";
import { LoginUser } from "../../utils/SocketApi";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		id: "",
		username: "",
		userColor: "",
	},
	reducers: {
		setUser: {
			reducer: (state, action) => {
				const createdUser = action.payload;
				state.id = createdUser.id;
				state.username = createdUser.username;
				state.userColor = createdUser.userColor;

				LoginUser(createdUser);
				localStorage.setItem("user", JSON.stringify(createdUser));
			},
			prepare: (userInfo) => {
				return {
					payload: {
						id: nanoid(),
						username: userInfo.username,
						userColor: userInfo.userColor,
					},
				};
			},
		},
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
