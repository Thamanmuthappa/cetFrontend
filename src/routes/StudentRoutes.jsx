import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const StudentRoutes = () => {
	return (
		<Switch>
			<Route exact path="/student/signin">
				Hello Student signin
			</Route>
		</Switch>
	);
};

export default StudentRoutes;
