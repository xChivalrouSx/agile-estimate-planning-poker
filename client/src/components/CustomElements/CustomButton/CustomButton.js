import React from "react";

const CustomButton = ({ text }) => {
	return (
		<div className="d-grid gap-2">
			<button type="submit" className="btn btn-primary">
				{text}
			</button>
		</div>
	);
};

export default CustomButton;
