import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const ClubRoutes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/club/signin">
					Hello Club signin
				</Route>
			</Switch>
		</Router>
	);
};

export default ClubRoutes;
