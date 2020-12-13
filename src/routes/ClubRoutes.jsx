import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../pages/club/Dashboard/Dashboard";
import ClubSignin from "../pages/club/SignIn";
import SignUp from "../pages/club/SignUp";

const ClubRoutes = () => {
	return (
		<Switch>
			<Route exact path="/club/signin" component={ClubSignin} />
			<Route exact path="/club/signup" component={SignUp} />
			<Route exact path="/club/dashboard" component={Dashboard} />
		</Switch>
	);
};

export default ClubRoutes;
