import React from "react";

const CustomRadioButton = ({
	className,
	checked,
	onChange,
	value,
	name,
	content,
}) => {
	return (
		<div>
			<input
				className={className}
				type="radio"
				name={name}
				checked={checked}
				onChange={onChange}
				value={value}
			/>
			<label className="form-check-label ps-2">{content}</label>
		</div>
	);
};

export default CustomRadioButton;
