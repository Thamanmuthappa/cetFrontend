import { CircularProgress } from "@material-ui/core";
import React from "react";

const Loading = (violated) => {
	return (
		<div
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#081220",
			}}
		>
			<CircularProgress color="primary" violated={violated}/>
		</div>
	);
};

export default Loading;
