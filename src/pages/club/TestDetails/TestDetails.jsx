import {
	Button,
	Container,
	Divider,
	Grid,
	Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { fetchTestDetails, fetchTestDomains } from "../../../API/GET";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import "./TestDetails.css";

const TestDetails = (props) => {
	const id = props.match.params.id;
	const [loading, setLoading] = useState(true);

	const [testDetails, setTestDetails] = useState({});
	const [testDomains, setTestDomains] = useState([]);

	const getDetails = async () => {
		const token = localStorage.getItem("clubAuthToken");
		const details = await fetchTestDetails(id, token);
		const domains = await fetchTestDomains(id, token);

		console.log(details, domains);
		setTestDetails(details);
		setTestDomains(domains);
		setLoading(false);
	};

	useEffect(() => {
		getDetails();
	}, []);

	return (
		<div className="test-details-page">
			<Navbar location="Test Details" />
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
									<strong>Duration:</strong>{" "}
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
					<div
						className="test-page-domain-top"
						style={{ textAlign: "right" }}
					>
						<Button
							variant="contained"
							className="custom-action-btn"
							color="primary"
						>
							<Add /> Add a new domain
						</Button>
					</div>
					<div className="test-page-domain-list">
						{testDomains.length === 0 ? (
							<div className="test-page-no-domains">
								<Typography variant="h2" className="light-text">
									No domains created
								</Typography>
							</div>
						) : null}
					</div>
				</div>
				<Divider />
			</Container>
		</div>
	);
};

export default TestDetails;
