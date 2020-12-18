import React from "react";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";

const TestScreen = () => {
	return (
		<div className="test-page">
			<StudentNavbar location="Attempt a test" />
		</div>
	);
};

export default TestScreen;
