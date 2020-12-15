import React from "react";

import "./ClubDomainTile.css";

const ClubDomainTile = ({ title }) => {
	return (
		<div className="club-domain-tile">
			<span className="tile-title">{title}</span>
		</div>
	);
};

export default ClubDomainTile;
