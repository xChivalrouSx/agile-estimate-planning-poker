import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRoom } from "../../redux/user/userSlice";
import { JoinRoom } from "../../utils/SocketApi";
import CustomButton from "../CustomElements/CustomButton";
import CustomRadioButton from "../CustomElements/CustomRadioButton";
import FloatingTextBox from "../CustomElements/FloatingTextBox";

const fiboCards = "1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144";
const detailedCards =
	"0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3, 3.5, 4, 5, 6";

const WaitingRoom = ({ roomSetter }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	const formikCreate = useFormik({
		initialValues: {
			roomCards: detailedCards,
		},
		onSubmit: () => {
			dispatch(
				createRoom({
					cards: formikCreate.values.roomCards,
					roomSetter: roomSetter,
				})
			);
		},
	});

	const formikJoin = useFormik({
		initialValues: {
			roomId: "",
		},
		onSubmit: () => {
			JoinRoom(formikJoin.values.roomId, user, roomSetter);
		},
	});

	return (
		<div className="w-100 h-100-with-navbar container">
			<div className="w-100 h-25 row align-items-center">
				<div className="border mx-auto login-container">
					<form className="p-4" onSubmit={formikCreate.handleSubmit}>
						<CustomRadioButton
							className="form-check-input mb-3"
							name="roomCards"
							checked={formikCreate.values.roomCards === fiboCards}
							onChange={formikCreate.handleChange}
							value={fiboCards}
							content={fiboCards}
						/>
						<CustomRadioButton
							className="form-check-input mb-4"
							name="roomCards"
							checked={formikCreate.values.roomCards === detailedCards}
							onChange={formikCreate.handleChange}
							value={detailedCards}
							content={detailedCards}
						/>
						<CustomButton text="Create Planning Room" />
					</form>
				</div>
			</div>
			<div className="w-100 h-50 row align-items-center">
				<div className="border mx-auto login-container">
					<form className="p-4" onSubmit={formikJoin.handleSubmit}>
						<FloatingTextBox
							name="roomId"
							placeHolder="Room Id"
							value={formikJoin.values.roomId}
							onChange={formikJoin.handleChange}
						/>
						<CustomButton text="Join Planning Room" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default WaitingRoom;
