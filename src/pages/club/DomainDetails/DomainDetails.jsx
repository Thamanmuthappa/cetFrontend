import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	CircularProgress,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Tooltip,
	Typography,
} from "@material-ui/core";
import { Add, ExpandMore } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
	fetchQuestionsInDomain,
	fetchSingleDomainDetails,
} from "../../../API/GET";
import QuestionAddModal from "../../../components/Club/QuestionAddModal";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import "./DomainDetails.css";
import "../../../components/Club/QuestionsDisplay/QuestionsDisplay.css";
import QuestionsDisplay from "../../../components/Club/QuestionsDisplay/QuestionsDisplay";
import Loading from "../../Loading";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const DomainDetails = (props) => {
	const testId = props.match.params.id;
	const domainId = props.match.params.domainId;

	const [domainDetails, setDomainDetails] = useState(
		props.location.state?.domain
	);
	const [loading, setLoading] = useState(true);
	const [questionAdd, setQuestionAdd] = useState(false);

	const [questions, setQuestions] = useState([]);
	const [questionsLoading, setQuesLoading] = useState(true);

	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const history = useHistory();
	const { executeRecaptcha } = useGoogleReCaptcha();

	const getQuestions = async () => {
		setQuesLoading(true);
		const token = localStorage.getItem("clubAuthToken");
		const questions = await fetchQuestionsInDomain(testId, domainId, token);

		setQuestions(questions);
		setQuesLoading(false);
	};

	const addMarksToDomain = (marks) => {
		setDomainDetails((prevState) => ({
			...prevState,
			domainMarks: Number(prevState.domainMarks) + Number(marks),
		}));
	};

	const handleDelete = async () => {
		setDeleteLoading(true);
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/delete`;
		const token = localStorage.getItem("clubAuthToken");

		const captcha = await executeRecaptcha();

		const data = {
			testId,
			domainId,
			captcha,
		};

		try {
			await Axios.delete(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: data,
			}).then((res) => {
				history.replace(`/club/test/${testId}`);
			});
		} catch (error) {
			// console.log(error);
			setDeleteLoading(false);
		}
	};

	const getDomainDetails = async () => {
		const token = localStorage.getItem("clubAuthToken");
		const details = await fetchSingleDomainDetails(domainId, token);

		setDomainDetails(details);
		setLoading(false);
	};

	const handleModalClose = () => {
		getQuestions();
		setQuestionAdd(false);
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
								<Grid item xs={4}>
									<p>
										<strong>Domain Name:</strong>{" "}
										{domainDetails.domainName}{" "}
									</p>

									<p>
										<strong>Domain Duration:</strong>{" "}
										{domainDetails.domainDuration}
										minutes
									</p>
									<p>
										<Tooltip
											title="Marks are automatically added based on questions"
											arrow
										>
											<span>
												<strong>Domain Marks:</strong>{" "}
												{domainDetails.domainMarks}{" "}
											</span>
										</Tooltip>
									</p>
								</Grid>
								<Grid item xs={4}>
									<p>
										<strong>Domain Description:</strong>{" "}
										{domainDetails.domainDescription}{" "}
									</p>
								</Grid>
								<Grid
									item
									xs={4}
									style={{
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									<Button
										color="primary"
										variant="contained"
										className="delete-domain-btn"
										onClick={() => setConfirmDelete(true)}
									>
										Delete Domain
									</Button>
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
								<Add />
								Add a new question
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
							) : (
								<div className="domain-questions">
									{questions.map((question, i) => (
										<Accordion key={i} elevation={4}>
											<AccordionSummary
												expandIcon={<ExpandMore />}
												aria-controls="question-content"
												style={{
													whiteSpace: "pre-wrap",
												}}
											>
												{question.description}{" "}
											</AccordionSummary>
											<AccordionDetails>
												<QuestionsDisplay
													questionType={question.type}
													question={question}
												/>
											</AccordionDetails>
										</Accordion>
									))}{" "}
								</div>
							)}{" "}
						</div>
					</div>
				</Container>
			</div>
			<QuestionAddModal
				open={questionAdd}
				handleClose={handleModalClose}
				testId={testId}
				domainId={domainId}
				addMarks={addMarksToDomain}
			/>
			<Dialog
				open={confirmDelete}
				onClose={() => setConfirmDelete(false)}
			>
				<DialogTitle>
					Are you sure you want to delete this domain?
				</DialogTitle>
				<DialogContent style={{ textAlign: "center" }}>
					<span className="light-text">
						All the submissions (if any) will also be deleted.
					</span>
				</DialogContent>
				<DialogActions>
					<Button
						variant="outlined"
						onClick={() => setConfirmDelete(false)}
					>
						Cancel
					</Button>
					<Button
						color="primary"
						variant="contained"
						onClick={handleDelete}
						disabled={deleteLoading}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default DomainDetails;
