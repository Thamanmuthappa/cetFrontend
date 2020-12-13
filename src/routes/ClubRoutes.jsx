import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ClubSignin from "../pages/club/Signin";

const ClubRoutes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/club/signin" component={ClubSignin} />
			</Switch>
		</Router>
	);
};

export default ClubRoutes;
