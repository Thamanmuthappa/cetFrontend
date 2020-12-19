import { Container, Divider, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";

import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import TestQuestionDisplay from "../../../components/Student/TestQuestionDisplay/TestQuestionDisplay";
import { dummyTest } from "./dummyTest";
import "./TestScreen.css";

const TestScreen = () => {
	const [testDetails, setTestDetails] = useState(dummyTest);
	const [timeRemaining, setTimeRemaining] = useState(
		dummyTest.domainDetails.domainDuration
	);

	return (
		<div className="test-page">
			<StudentNavbar location="Attempt test" />
			<Container className="test-container">
				<div className="student-test-details">
					<Grid container spacing={3}>
						<Grid
							item
							xs={12}
							sm={6}
							style={{ textAlign: "center" }}
						>
							<Typography variant="h4" className="light-text">
								Club Name:{" "}
								<strong>{testDetails.clubDetails.name}</strong>
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							style={{ textAlign: "center" }}
						>
							<Typography variant="h4" className="light-text">
								Domain:{" "}
								<strong>
									{testDetails.domainDetails.domainName}
								</strong>
							</Typography>
						</Grid>
						<Divider style={{ height: "1px", width: "100%" }} />
						<Grid item xs={12} className="test-timer-grid">
							<div className="test-time-remaining">
								<Typography variant="h4" color="primary">
									<strong>
										{timeRemaining} minutes remaining!{" "}
										{/* TODO: MAKE DYNAMIC */}
									</strong>
								</Typography>
							</div>
						</Grid>
						<Divider style={{ width: "100%" }} />
					</Grid>
				</div>
				<div className="student-questions-display">
					{testDetails.questions.map((question) => (
						<TestQuestionDisplay question={question} />
					))}
				</div>
			</Container>
		</div>
	);
};

export default TestScreen;
