import React from "react";
import { Switch, Route } from "react-router-dom";
import ClubSignin from "../pages/club/SignIn";
import SignUp from "../pages/club/SignUp";

const ClubRoutes = () => {
	return (
		<Switch>
			<Route exact path="/club/signin" component={ClubSignin} />
			<Route exact path="/club/signup" component={SignUp} />
		</Switch>
	);
};

export default ClubRoutes;
