import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogTitle,
	Divider,
	Grid,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { fetchTestDetails, fetchTestDomains } from "../../../API/GET";
import ClubDomainTile from "../../../components/Club/DomainTile/ClubDomainTile";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import Loading from "../../Loading";
// import "../../TestDetails/TestDetails";
import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import Axios from "axios";

const GetTestDomains = (props) => {
	const id = props.match.params.testId;
	const data = props.location.state.details || {};

	const [loading, setLoading] = useState(true);

	const [testDetails, setTestDetails] = useState(data.testDetails);
	const [testDomains, setTestDomains] = useState(data.domains);
	const [currentSelected, setCurrentSelected] = useState({});

	const [confirmStart, setConfirmStart] = useState(false);
	const [startDisabled, setStartDisable] = useState(false);

	const [redirect, setRedirect] = useState(false);

	const history = useHistory();

	useEffect(() => {
		console.log(data);
		if (!data) {
			setRedirect(true);
		} else {
			setLoading(false);
		}
	}, []);

	const setup = async () => {
		setStartDisable(true);
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/attempt`;
		const token = localStorage.getItem("studentAuthToken");

		const data = {
			testId: id,
			domainId: currentSelected._id,
		};

		console.log(data);

		try {
			await Axios.post(url, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				console.log(res);
				const details = res.data;
				history.push({
					pathname: `/student/test/${id}/${data.domainId}`,
					state: {
						details: details,
						startedAt: Date.now(),
						testDetails: props.location.state.details,
					},
				});
			});
		} catch (error) {
			console.log(error.response);
			setStartDisable(false);
		}
	};

	const handleDomainClick = (domain) => {
		setCurrentSelected(domain);
		setConfirmStart(true);
	};

	const handleModalClose = () => {
		setConfirmStart(false);
		setCurrentSelected({});
	};

	if (loading) {
		return <Loading />;
	} else if (redirect) {
		return <Redirect to="/student/dashboard" />;
	}

	return (
		<div className="test-details-page">
			<StudentNavbar location="Test Domains" />
			<Container className="test-details-container">
				<div className="test-info">
					<h1>
						<u>Test Details</u>
					</h1>
					<div style={{ color: "#666666" }}>
						<Grid container spacing={3}>
							<Grid item xs={6} sm={3}>
								<p>
									<strong>Round Number:</strong>{" "}
									{testDetails.roundNumber}
								</p>
								<p>
									<strong>Round Type:</strong>{" "}
									{testDetails.roundType}
								</p>
								<p>
									<strong>Total Duration:</strong>{" "}
									{testDetails.duration}
								</p>
							</Grid>
							<Grid item xs={6} sm={3}>
								<p>
									<strong>Start Time:</strong>{" "}
									{new Date(
										testDetails.scheduledForDate
									).toLocaleString()}
								</p>
								<p>
									<strong>End Time:</strong>{" "}
									{new Date(
										testDetails.scheduledEndDate
									).toLocaleString()}
								</p>
							</Grid>
						</Grid>
					</div>
				</div>
				<Divider />
				<div className="test-page-domain">
					<h1>
						<u>Test Domains</u>
					</h1>

					<div className="test-page-domain-list">
						{testDomains.length === 0 ? (
							<div className="test-page-no-domains">
								<Typography variant="h2" className="light-text">
									No domains created
								</Typography>
							</div>
						) : (
							<div className="test-page-domains-list">
								<Grid container spacing={3}>
									{testDomains.map((domain) => (
										<Grid item xs={12} sm={3}>
											<div
												onClick={() =>
													handleDomainClick(domain)
												}
											>
												<ClubDomainTile
													title={domain.domainName}
												/>
											</div>
										</Grid>
									))}
								</Grid>
							</div>
						)}
					</div>
				</div>
				{/* <Divider /> */}
			</Container>
			<Dialog open={confirmStart} onClose={handleModalClose}>
				<DialogTitle>
					Are you sure you want to start this domain?
				</DialogTitle>

				<DialogActions style={{ justifyContent: "center" }}>
					<Button
						color="primary"
						variant="contained"
						onClick={setup}
						disabled={startDisabled}
					>
						Start Domain
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default GetTestDomains;
