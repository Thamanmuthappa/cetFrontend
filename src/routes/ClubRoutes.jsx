import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../pages/club/SignIn";
import SignUp from "../pages/club/SignUp";

const ClubRoutes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/club/signin" component={SignIn} />
				<Route exact path="/club/signup" component={SignUp} />
			</Switch>
		</Router>
	);
};

export default ClubRoutes;
