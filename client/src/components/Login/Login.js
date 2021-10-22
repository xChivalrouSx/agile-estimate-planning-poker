import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";

const Login = () => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			username: "",
			userColor: "#000000",
		},
		onSubmit: () => {
			dispatch(setUser(formik.values));
		},
	});

	return (
		<div className="w-100 h-100-with-navbar container">
			<div className="w-100 h-100 row align-items-center">
				<div className="border mx-auto login-container">
					<form className="p-4" onSubmit={formik.handleSubmit}>
						<div className="row mb-4 align-items-center">
							<div className="col-3">User Color :</div>
							<div className="d-grid gap-2 col-9">
								<input
									name="userColor"
									type="color"
									className="form-control form-control-color w-100"
									value={formik.values.userColor}
									onChange={formik.handleChange}
									title="Choose your color"
								/>
							</div>
						</div>
						<div className="mb-4">
							<div className="form-floating mb-3">
								<input
									name="username"
									className="form-control"
									placeholder="username"
									value={formik.values.username}
									onChange={formik.handleChange}
								/>
								<label htmlFor="floatingInput">Username</label>
							</div>
						</div>
						<div className="d-grid gap-2">
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
