import React from "react";

const DomainDetails = (props) => {
	const testId = props.match.params.id;
	const domainId = props.match.params.domainId;

	return (
		<div className="domain-details-page">
			Welcome test {testId} domain {domainId}
		</div>
	);
};

export default DomainDetails;
