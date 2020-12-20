import React, { useContext, useEffect, useState } from "react";
import Loading from "../Loading";
import { StudentContext } from "../../context/StudentContext";
import { Redirect } from "react-router-dom";

const StudentOAuth = (props) => {
	const token = props.match.params.token;
	const loginCount = props.match.params.loginCount;
	const { isLoggedIn, setLoginTrue } = useContext(StudentContext);

	const [redirect, setRedirect] = useState(false);
	const [profileRedirect, setProfileRedirect] = useState(false);

	useEffect(() => {
		console.log(token);
		if (token) {
			setLoginTrue(token);
		}
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			if (loginCount === "0") {
				setProfileRedirect(true);
			} else {
				setRedirect(true);
			}
		}
	}, [isLoggedIn]);

	if (redirect) {
		return <Redirect to="/student/dashboard" />;
	} else if (profileRedirect) {
		return <Redirect to="/student/profile" />;
	}

	return <Loading />;
};

export default StudentOAuth;
