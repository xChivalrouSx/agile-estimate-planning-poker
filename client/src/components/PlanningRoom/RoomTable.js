import React from "react";
import { showCard } from "../../utils/SocketApi";
import EstimateUserCard from "./EstimateUserCard";

const RoomTable = ({ roomInfo, roomSetter }) => {
	const ChangeShowCard = () => {
		showCard(roomInfo.id, !roomInfo.showCards, roomSetter);
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
							style={user.location}
							className="position-absolute badge m-0 p-0"
						>
							<EstimateUserCard
								value={user.selectedCard}
								username={user.username}
								userColor={user.userColor}
								showCard={roomInfo.showCards}
							/>
						</div>
					);
				})}

				<button
					type="button"
					className="btn btn-primary btn-lg"
					onClick={ChangeShowCard}
				>
					{roomInfo.showCards ? "Hide Cards" : "Show Cards"}
				</button>
			</div>
		</>
	);
};
export default RoomTable;
