import React from "react";
import EstimateCard from "./EstimateCard";

const RoomTable = ({ roomInfo }) => {
	return (
		<>
			<div
				style={{
					marginTop: "125px",
					marginBottom: "125px",
					width: "600px",
					height: "250px",
				}}
				className="border border-dark rounded-pill position-relative
								bg-success mx-auto
								d-flex align-items-center justify-content-center"
			>
				<div class="position-absolute top-0 start-100 translate-middle badge">
					<EstimateCard value="0" />
				</div>

				<button type="button" class="btn btn-primary btn-lg">
					Show Cards
				</button>
			</div>
		</>
	);
};
export default RoomTable;
