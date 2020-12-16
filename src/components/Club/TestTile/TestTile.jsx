import React from "react";
import "./TestTile.css";

const ClubTestTile = ({ test }) => {
	const { roundNumber } = test;
	return (
		<div className="club-test-tile">
			<span className="tile-title">Round: #{roundNumber}</span>
		</div>
	);
};

export default ClubTestTile;
