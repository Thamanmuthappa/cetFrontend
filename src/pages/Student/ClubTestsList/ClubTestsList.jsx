import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ClubTestTile from "../../../components/Club/TestTile/TestTile";
import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import "./ClubTestsList.css";
import { StudentContext } from "../../../context/StudentContext";
import { Redirect, useHistory } from "react-router-dom";
import Loading from "../../Loading";
import Countdown from "react-countdown";

const ClubTestsList = (props) => {
	const [tests, setTests] = useState([]);

	const { isLoggedIn } = useContext(StudentContext);

	const [loading, setLoading] = useState(true);
	const [redirect, setRedirect] = useState(false);

	const [startTestModal, setStartTest] = useState(false);
	const [currentSelected, setCurrentSelected] = useState({});
	const [startDisabled, setStartDisabled] = useState(false);

	const history = useHistory();

	const clubId = props.match.params.clubId;

	const handleModalOpen = (test) => {
		setCurrentSelected(test);
		setStartTest(true);
	};

	const handleModalClose = () => {
		setStartTest(false);
		setCurrentSelected({});
	};

	const attempTest = async () => {
		setStartDisabled(true);
		const test = JSON.parse(JSON.stringify(currentSelected));
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/attempt`;
		const token = localStorage.getItem("studentAuthToken");

		const data = {
			testId: test._id,
		};

		try {
			await Axios.post(url, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				history.push({
					pathname: `/student/test/domains/${data.testId}`,
					state: {
						details: res.data,
					},
				});
			});
		} catch (error) {
			setStartDisabled(false);
		}
	};

	const getTests = async () => {
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/allPublishedTestsOfAClub?clubId=${clubId}`;
		const token = localStorage.getItem("studentAuthToken");

		try {
			await Axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setTests(res.data.tests);
				setLoading(false);
			});
		} catch (error) {}
	};

	useEffect(() => {
		if (isLoggedIn) {
			getTests();
		} else {
			setRedirect(true);
		}
	}, []);

	if (redirect) {
		return <Redirect to="/student/signin" />;
	} else if (loading) {
		return <Loading />;
	}

	return (
		<>
			<StudentNavbar location="Tests Available" />
			<Container className="club-dash-tests student-test-list">
				<div>
					<Typography variant="h3">Tests Available:</Typography>
				</div>
				<Divider />
				<div className="club-test-list" style={{ paddingTop: "3%" }}>
					{tests.length === 0 ? (
						<div className="no-tests-div">
							<Typography variant="h2" className="light-text">
								No tests created by this club
							</Typography>
						</div>
					) : (
						<div className="club-tests-display">
							<Grid container spacing={2}>
								{tests.map((test, i) => (
									<Grid
										key={i}
										item
										sm={6}
										md={3}
										onClick={() => handleModalOpen(test)}
									>
										<ClubTestTile test={test} />
									</Grid>
								))}{" "}
							</Grid>
						</div>
					)}{" "}
				</div>
			</Container>
			<Dialog open={startTestModal} onClose={handleModalClose}>
				<DialogTitle>
					Are you sure you want to start this test?
				</DialogTitle>
				<DialogContent
					style={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
					}}
				>
					<div className="modal-test-instructions">
						<strong>TEST INSTRUCTIONS:</strong>
						<br />
						<br />
						{currentSelected.instructions}
					</div>
					<div className="light-text" style={{ textAlign: "center" }}>
						<strong>Time till start</strong>
					</div>

					<Typography variant="h6" color="primary">
						<center>
							<strong style={{ textAlign: "center" }}>
								<Countdown
									date={currentSelected.scheduledForDate}
									style={{ textAlign: "center" }}
								/>
							</strong>
							<p
								style={{
									color: "black",
									fontSize: "13px",
								}}
							>
								P.S: You will lose all progress if you refresh
								the page or go back.
							</p>
						</center>
					</Typography>
				</DialogContent>
				<DialogActions
					style={{ justifyContent: "center", marginBottom: "20px" }}
				>
					{currentSelected.scheduledForDate > Date.now() ? (
						<span className="light-text">Test not started yet</span>
					) : currentSelected.scheduledEndDate < Date.now() ? (
						<span className="light-text">Test ended!</span>
					) : (
						<Button
							color="primary"
							variant="contained"
							onClick={attempTest}
							disabled={startDisabled}
						>
							Start Test
						</Button>
					)}{" "}
				</DialogActions>
			</Dialog>
		</>
	);
};
export default ClubTestsList;
