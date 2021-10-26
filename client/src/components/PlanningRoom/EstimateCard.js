import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCard } from "../../redux/user/userSlice";

const EstimateCard = ({ value, roomSetter }) => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	const extraClass =
		value === user.selectedCard
			? " bg-primary border-3 "
			: " bg-secondary border-2 ";

	const CardOnClick = () => {
		dispatch(setSelectedCard({ card: value, roomSetter: roomSetter }));
	};

	return (
		<div
			onClick={CardOnClick}
			className={
				"estimate-card border border-primary rounded-3 bg-gradient bg-opacity-25" +
				extraClass
			}
		>
			{value}
		</div>
	);
};

export default EstimateCard;
