import React from "react";
import "./TestTile.css";

const ClubTestTile = ({ test }) => {
	const { roundNumber, roundType } = test;
	return (
		<div className="club-test-tile">
			<span className="tile-title">Round: #{roundNumber}</span>
			{/* <span className="tile-subtitle">Type: {roundType}</span> */}
			<span className="tile-subtitle"> {roundType}</span>
		</div>
	);
};

export default ClubTestTile;
