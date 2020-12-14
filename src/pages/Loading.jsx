import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loading = () => {
	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress color="primary" />
		</div>
	);
};

export default Loading;
