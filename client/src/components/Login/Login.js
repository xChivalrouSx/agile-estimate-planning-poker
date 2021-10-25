import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../redux/user/userSlice";
import CustomButton from "../CustomElements/CustomButton";
import CustomColorPicker from "../CustomElements/CustomColorPicker";
import FloatingTextBox from "../CustomElements/FloatingTextBox";

const Login = () => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			username: "",
			userColor: "#000000",
		},
		onSubmit: () => {
			dispatch(createUser(formik.values));
		},
	});

	return (
		<div className="w-100 h-100-with-navbar container">
			<div className="w-100 h-100 row align-items-center">
				<div className="border mx-auto login-container">
					<form className="p-4" onSubmit={formik.handleSubmit}>
						<CustomColorPicker
							name="userColor"
							value={formik.values.userColor}
							onChange={formik.handleChange}
							title="Choose your color"
						/>
						<FloatingTextBox
							name="username"
							placeHolder="Username"
							value={formik.values.username}
							onChange={formik.handleChange}
						/>
						<CustomButton text="Login" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
