import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudentContextProvider from "../context/StudentContext";
import StudentSignIn from "../pages/Student/Signin";
import StudentOAuth from "../pages/Student/StudentOAuth";

const StudentRoutes = () => {
	return (
		<StudentContextProvider>
			<Switch>
				<Route exact path="/student/signin" component={StudentSignIn} />
				<Route
					exact
					path="/student/oauth/:token"
					component={StudentOAuth}
				/>
				<Route exact path="/student/dashboard">
					Student Dashboard
				</Route>
			</Switch>
		</StudentContextProvider>
	);
};

export default StudentRoutes;
