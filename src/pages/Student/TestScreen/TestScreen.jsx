import {
	Container,
	Divider,
	Fab,
	Grid,
	Tooltip,
	Typography,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import React, { useEffect, useState } from "react";

import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import TestQuestionDisplay from "../../../components/Student/TestQuestionDisplay/TestQuestionDisplay";
import Loading from "../../Loading";
import { dummyTest } from "./dummyTest";
import "./TestScreen.css";

const TestScreen = () => {
	const [testDetails, setTestDetails] = useState(dummyTest);
	const [timeRemaining, setTimeRemaining] = useState(
		dummyTest.domainDetails.domainDuration
	);

	const [answers, setAnswers] = useState({});
	const [loading, setLoading] = useState(true);

	const createAnsObject = (testDetails) => {
		const obj = {};
		obj.domainId = testDetails.domainDetails._id;
		obj.testId = testDetails.testDetails._id;
		obj.clubId = testDetails.clubDetails._id;
		obj.submissions = [];

		testDetails.questions.map((question) => {
			const curr = {
				questionId: question.questionId,
				questionType: question.questionType,
				answers:
					question.questionType === "multipleCorrect" ? [] : [""],
			};

			obj.submissions.push(curr);
		});

		return obj;
	};

	useEffect(() => {
		const ansObject = createAnsObject(testDetails);
		setAnswers(ansObject);
		console.log(ansObject);
		setLoading(false);
	}, []);

	if (loading) {
		return <Loading />;
	}

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
					{testDetails.questions.map((question, i) => (
						<TestQuestionDisplay
							question={question}
							index={i}
							answers={answers}
							setAnswers={setAnswers}
							key={i}
						/>
					))}
				</div>
			</Container>
			<Tooltip title="Submit Test">
				<Fab
					color="primary"
					aria-label="submit-test"
					className="submit-fab"
				>
					<Done />
				</Fab>
			</Tooltip>
		</div>
	);
};

export default TestScreen;
