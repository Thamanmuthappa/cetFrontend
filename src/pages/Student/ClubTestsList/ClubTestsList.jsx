import { Container, Divider, Grid, Typography } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ClubTestTile from "../../../components/Club/TestTile/TestTile";
import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import "./ClubTestsList.css";

const ClubTestsList = (props) => {
	const [tests, setTests] = useState([]);

	const [loading, setLoading] = useState(true);

	const clubId = props.match.params.clubId;

	const handleTestClick = () => {
		console.log("dsds");
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
				console.log(res);
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTests();
	}, []);

	return (
		<>
			<StudentNavbar location="Tests Available" />
			<Container className="club-dash-tests student-test-list">
				<div>
					<Typography variant="h3">Tests Available: </Typography>
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
										onClick={() => handleTestClick(test)}
									>
										<ClubTestTile test={test} />
									</Grid>
								))}
							</Grid>
						</div>
					)}
				</div>
			</Container>
		</>
	);
};

export default ClubTestsList;
