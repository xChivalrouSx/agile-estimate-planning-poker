import React from "react";

const FloatingTextBox = ({ name, className, placeHolder, value, onChange }) => {
	return (
		<div className="mb-4">
			<div className="form-floating mb-3">
				<input
					name={name}
					className={className}
					placeholder={placeHolder}
					value={value}
					onChange={onChange}
				/>
				<label htmlFor="floatingInput">{placeHolder}</label>
			</div>
		</div>
	);
};

export default FloatingTextBox;
