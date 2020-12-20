import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import { StudentContext } from "../../context/StudentContext";
import { Redirect } from "react-router-dom";

const StudentOAuth = (props) => {
	const token = props.match.params.token;
	const loginCount = props.match.params.loginCount;
	const { isLoggedIn, setLoginTrue } = useContext(StudentContext);

	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		console.log(token);
		if (token) {
			setLoginTrue(token);
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			setRedirect(true);
		}
	}, [isLoggedIn]);

	if (redirect) {
		return <Redirect to="/student/dashboard" />;
	}

	return <Loading />;
};

export default StudentOAuth;
