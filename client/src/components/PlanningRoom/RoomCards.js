import React from "react";
import { ArrowDownCircle } from "react-bootstrap-icons";
import EstimateCard from "./EstimateCard";

const RoomCards = ({ cardValues, roomSetter }) => {
	return (
		<>
			<div className="container mw-100 w-100 sticky-bottom">
				<div className="row w-100 mw-100 mb-3 m-auto justify-content-center">
					<div className="col d-flex justify-content-center align-items-center">
						Pick a Card <ArrowDownCircle size="28" className="ms-2" />
					</div>
				</div>
				<div className="row w-100 mw-100 m-auto justify-content-center">
					{cardValues.map((item, index) => {
						return (
							<div
								key={"div-" + index}
								className="col p-0 m-0 flex-grow-0"
							>
								<EstimateCard
									key={"card-" + index}
									value={item}
									roomSetter={roomSetter}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default RoomCards;
