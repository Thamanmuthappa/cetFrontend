import React from "react";

const TestDetails = (props) => {
	const id = props.match.params.id;

	return <div>Hello {id}</div>;
};

export default TestDetails;
