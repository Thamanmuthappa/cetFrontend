import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signin from "../pages/club/Signin";

const ClubRoutes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/club/signin" component={Signin} />
			</Switch>
		</Router>
	);
};

export default ClubRoutes;
