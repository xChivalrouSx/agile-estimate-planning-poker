import React from "react";

const CustomColorPicker = ({ name, classNames, title, value, onChange }) => {
	return (
		<div className="row mb-4 align-items-center">
			<div className="col-3">User Color :</div>
			<div className="d-grid gap-2 col-9">
				<input
					name={name}
					type="color"
					className={"form-control form-control-color w-100 " + classNames}
					value={value}
					onChange={onChange}
					title={title}
				/>
			</div>
		</div>
	);
};

export default CustomColorPicker;
