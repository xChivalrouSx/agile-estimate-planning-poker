import React from "react";
import { ShowCard } from "../../utils/SocketApi";
import EstimateUserCard from "./EstimateUserCard";

const RoomTable = ({ roomInfo, roomSetter }) => {
	const ChangeShowCard = () => {
		ShowCard(roomInfo.id, !roomInfo.showCards, roomSetter);
	};

	const GetAvarage = () => {
		var sum = 0;
		var numberOfUser = 0;
		roomInfo.users.forEach((user) => {
			const selected = user.selectedCard;
			if (selected !== "") {
				numberOfUser++;
				sum += Number(selected);
			}
		});
		return sum !== 0 ? sum / numberOfUser : "";
	};

	return (
		<>
			<div
				style={{
					marginTop: "125px",
					marginBottom: "150px",
					width: "600px",
					height: "250px",
				}}
				className="border border-dark rounded-pill position-relative
								bg-success mx-auto
								d-flex align-items-center justify-content-center"
			>
				{roomInfo.users.map((user) => {
					return (
						<div
							key={"user-" + user.id}
							style={user.location}
							className="position-absolute badge m-0 p-0"
						>
							<EstimateUserCard
								key={"user-card-" + user.id}
								value={user.selectedCard}
								username={user.username}
								userColor={user.userColor}
								showCard={roomInfo.showCards}
							/>
						</div>
					);
				})}
				<div className="container h-auto w-auto">
					<button
						type="button"
						className="btn btn-primary btn-lg"
						onClick={ChangeShowCard}
					>
						{roomInfo.showCards ? "Hide Cards" : "Show Cards"}
					</button>
					{roomInfo.showCards && (
						<div className="average-div">Average: {GetAvarage()}</div>
					)}
				</div>
			</div>
		</>
	);
};
export default RoomTable;
