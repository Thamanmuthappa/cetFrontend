import {
	Button,
	CircularProgress,
	Container,
	Divider,
	Grid,
	Tooltip,
	Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { fetchQuestionsInDomain } from "../../../API/GET";
import QuestionAddModal from "../../../components/Club/QuestionAddModal";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import "./DomainDetails.css";

const DomainDetails = (props) => {
	const testId = props.match.params.id;
	const domainId = props.match.params.domainId;

	const [domainDetails] = useState(props.location.state.domain);
	const [loading, setLoading] = useState(true);
	const [questionAdd, setQuestionAdd] = useState(false);

	const [questions, setQuestions] = useState([]);
	const [questionsLoading, setQuesLoading] = useState(true);

	const getQuestions = async () => {
		const token = localStorage.getItem("clubAuthToken");
		const questions = await fetchQuestionsInDomain(testId, domainId, token);

		console.log(questions);

		setQuestions(questions);
		setQuesLoading(false);
	};

	// const getDomainDetails = async () => {
	// 	const details = await fetchD;
	// };

	useEffect(() => {
		// if (!domainDetails) {
		// 	getDomainDetails();
		// }

		getQuestions();
	}, []);

	return (
		<>
			<div className="domain-details-page">
				<Navbar location="Domain Name" />
				<Container className="test-details-container">
					<div className="test-info">
						<h1>
							<u>Domain Details</u>
						</h1>
						<div style={{ color: "#666666" }}>
							<Grid container spacing={3}>
								<Grid item xs={6} sm={4}>
									<p>
										<strong>Domain Name:</strong>{" "}
										{domainDetails.domainName}
									</p>

									<p>
										<strong>Domain Duration:</strong>{" "}
										{domainDetails.domainDuration} minutes
									</p>
									<p>
										<Tooltip
											title="Marks are automatically added based on questions"
											arrow
										>
											<span>
												<strong>Domain Marks:</strong>{" "}
												{domainDetails.domainMarks}
											</span>
										</Tooltip>
									</p>
								</Grid>
								<Grid item xs={6} sm={7}>
									<p>
										<strong>Domain Description:</strong>{" "}
										{domainDetails.domainDescription}
									</p>
								</Grid>
							</Grid>
						</div>
					</div>
					<Divider />
					<div className="test-page-domain">
						<h1>
							<u>Questions</u>
						</h1>
						<div
							className="test-page-domain-top"
							style={{ textAlign: "right" }}
						>
							<Button
								variant="contained"
								className="custom-action-btn"
								color="primary"
								onClick={() => setQuestionAdd(true)}
							>
								<Add /> Add a new question
							</Button>
						</div>
						<div className="domain-page-question-list">
							{questionsLoading ? (
								<div className="questions-loading">
									<CircularProgress color="primary" />
									Getting Questions...
								</div>
							) : questions.length === 0 ? (
								<div className="test-page-no-domains">
									<Typography
										variant="h2"
										className="light-text"
									>
										No questions created
									</Typography>
								</div>
							) : null}
						</div>
					</div>
				</Container>
			</div>
			<QuestionAddModal
				open={questionAdd}
				handleClose={() => setQuestionAdd(false)}
				testId={testId}
				domainId={domainId}
			/>
		</>
	);
};

export default DomainDetails;
