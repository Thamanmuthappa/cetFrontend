import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
	Container,
	Divider,
	Grid,
	IconButton,
	Snackbar,
	Tooltip,
	Typography,
} from "@material-ui/core";
import { Check, ExpandMore } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
	fetchSubmissionsForDomain,
	fetchSingleDomainDetails,
} from "../../../../API/GET";
import QuestionAddModal from "../../../../components/Club/QuestionAddModal";
import Navbar from "../../../../components/Shared/Navbar/Navbar";
import "../../DomainDetails/DomainDetails.css";
import "../../../../components/Club/QuestionsDisplay/QuestionsDisplay.css";
import Loading from "../../../Loading";
import StudentTestQuestions from "../../../../components/Club/StudentTestQuestions/StudentTestQuestions";
import "./ResultTestDomain.css";
import ShortlistModal from "../../../../components/Club/ShortlistModal/ShortlistModal";
import { Alert } from "@material-ui/lab";

const DomainDetails = (props) => {
	const testId = props.match.params.id;
	const domainId = props.match.params.domainId;

	const [domainDetails, setDomainDetails] = useState(
		props.location.state?.domain
	);
	const [loading, setLoading] = useState(true);

	const [questions, setQuestions] = useState([]);
	const [questionsLoading, setQuesLoading] = useState(true);

	const [shortlisted, setShortlisted] = useState([]);
	const [shortlistModal, setShortlistModal] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [successShortlist, setSuccessShortlist] = useState(false);

	const getQuestions = async () => {
		setQuesLoading(true);
		const token = localStorage.getItem("clubAuthToken");
		const { final, shortlisted } = await fetchSubmissionsForDomain(
			domainId,
			token
		);

		setQuestions(final);
		setShortlisted(shortlisted);
		setQuesLoading(false);
	};

	const getDomainDetails = async () => {
		const token = localStorage.getItem("clubAuthToken");
		const details = await fetchSingleDomainDetails(domainId, token);

		setDomainDetails(details);
		setLoading(false);
	};

	const handleShortlistClick = (e, student) => {
		e.stopPropagation();

		setSelectedStudent(student);
		setShortlistModal(true);
	};

	const isShortlisted = (id) => {
		const f = shortlisted.find((x) => x.studentId === id);

		if (f) {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {
		if (!domainDetails) {
			getDomainDetails();
		} else {
			setLoading(false);
		}

		getQuestions();
	}, []);

	if (loading) {
		return <Loading />;
	}
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
							<u>Students</u>
						</h1>

						<div className="domain-page-question-list">
							{questionsLoading ? (
								<div className="questions-loading">
									<CircularProgress color="primary" />
									Getting students...
								</div>
							) : questions.length === 0 ? (
								<div className="test-page-no-domains">
									<Typography
										variant="h2"
										className="light-text"
									>
										No Students Attempted
									</Typography>
								</div>
							) : (
								<div
									className="domain-questions"
									style={{ whiteSpace: "pre-wrap" }}
								>
									{questions.map((question, i) => (
										<Accordion key={i} elevation={4}>
											<AccordionSummary
												expandIcon={<ExpandMore />}
												aria-controls="question-content"
												className="submission-summary"
											>
												<Tooltip
													title={`Shortlist this student ${
														isShortlisted(
															question.studentId
																._id
														)
															? "(Already shortlisted)"
															: null
													}`}
												>
													<IconButton
														onClick={(e) =>
															handleShortlistClick(
																e,
																question
															)
														}
													>
														<Check
															style={{
																fill: isShortlisted(
																	question
																		.studentId
																		._id
																)
																	? "green"
																	: "red",
															}}
														/>
													</IconButton>
												</Tooltip>
												{question.studentId.name}
											</AccordionSummary>
											<AccordionDetails
												style={{ padding: "10px" }}
											>
												<Divider />
												<StudentTestQuestions
													details={question.responses}
												/>
											</AccordionDetails>
										</Accordion>
									))}
								</div>
							)}
						</div>
					</div>
				</Container>
			</div>

			<ShortlistModal
				open={shortlistModal}
				onClose={() => setShortlistModal(false)}
				selected={selectedStudent}
				setSelected={setSelectedStudent}
				domainId={domainId}
				setSuccess={() => setSuccessShortlist(true)}
				refresh={getQuestions}
			/>
			<Snackbar
				open={successShortlist}
				autoHideDuration={4000}
				onClose={() => setSuccessShortlist(false)}
			>
				<Alert
					variant="filled"
					severity="success"
					onClose={() => setSuccessShortlist(false)}
				>
					Successfully shortlisted student
				</Alert>
			</Snackbar>
		</>
	);
};

export default DomainDetails;
