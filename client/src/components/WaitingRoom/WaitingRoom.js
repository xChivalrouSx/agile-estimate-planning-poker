import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { setRoom } from "../../redux/user/userSlice";

const WaitingRoom = () => {
	const dispatch = useDispatch();

	const formikCreate = useFormik({
		initialValues: {
			roomType: "custom",
		},
		onSubmit: () => {
			dispatch(setRoom({ isAdmin: true }));
		},
	});

	const formikJoin = useFormik({
		initialValues: {
			roomId: "",
		},
		onSubmit: () => {
			dispatch(
				setRoom({ isAdmin: false, roomId: formikJoin.values.roomId })
			);
		},
	});

	return (
		<div className="w-100 h-100-with-navbar container">
			<div className="w-100 h-25 row align-items-center">
				<div className="border mx-auto login-container">
					<form className="p-4" onSubmit={formikCreate.handleSubmit}>
						<div className="row mb-4 align-items-center">
							<div className="mb-3">
								<input
									className="form-check-input"
									type="radio"
									name="roomType"
									checked={formikCreate.values.roomType === "fibo"}
									onChange={formikCreate.handleChange}
									value="fibo"
								/>
								<label className="form-check-label ps-2">
									1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144
								</label>
							</div>
							<div>
								<input
									className="form-check-input"
									type="radio"
									name="roomType"
									checked={formikCreate.values.roomType === "custom"}
									onChange={formikCreate.handleChange}
									value="custom"
								/>
								<label className="form-check-label ps-2">
									0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 2.5, 3,
									3.5, 4, 5, 6
								</label>
							</div>
						</div>
						<div className="d-grid gap-2">
							<button type="submit" className="btn btn-primary">
								Create Planning Room
							</button>
						</div>
					</form>
				</div>
			</div>
			<div className="w-100 h-50 row align-items-center">
				<div className="border mx-auto login-container">
					<form className="p-4" onSubmit={formikJoin.handleSubmit}>
						<div className="mb-4">
							<div className="form-floating mb-3">
								<input
									name="roomId"
									className="form-control"
									placeholder="Room Id"
									value={formikJoin.values.roomId}
									onChange={formikJoin.handleChange}
								/>
								<label htmlFor="floatingInput">Room Id</label>
							</div>
						</div>
						<div className="d-grid gap-2">
							<button type="submit" className="btn btn-primary">
								Join Planning Room
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default WaitingRoom;
