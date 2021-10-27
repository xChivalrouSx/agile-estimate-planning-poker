import React from "react";

const EstimateUserCard = ({ value, username, userColor, showCard }) => {
	const bgColor = value === "" ? " bg-danger " : " bg-success ";

	return (
		<>
			<div style={{ color: userColor }} className="mb-1">
				{username}
			</div>
			<div
				className={
					bgColor +
					"text-dark border-2 estimate-user-card border border-primary rounded-3 bg-gradient bg-opacity-25"
				}
			>
				{showCard && value}
			</div>
		</>
	);
};

export default EstimateUserCard;
