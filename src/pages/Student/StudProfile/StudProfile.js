import React, { useState, useEffect, useContext } from "react";

import {
	Paper,
	Container,
	Button,
	Grid,
	makeStyles,
	TextField,
	Typography,
	Snackbar,
} from "@material-ui/core";
import { StudentContext } from "../../../context/StudentContext";
import { patchStudProfile } from "../../../API/PATCH";
import { Alert } from "@material-ui/lab";
import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import { fetchStudentProfile } from "../../../API/GET";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: "150px",
		height: "150px",
	},
	contPaper: {
		width: "80%",
		borderRadius: "20px",
		marginTop: "10px",
		paddingBottom: "40px",
	},
	input: {
		width: "100%",
	},
}));

const StudProfile = () => {
	const { studentProfile, setStudentDetails } = useContext(StudentContext);

	const classes = useStyles();

	const [error, setError] = useState(null);
	const [studData, setStudData] = useState(studentProfile.student);

	const [disabled, setDisabled] = useState(true);

	const [profileSuccess, setProfileSuccess] = useState(false);

	const handleProfileChange = (e) => {
		setStudData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const updateProfile = async () => {
		setDisabled(true);
		const token = localStorage.getItem("studentAuthToken");

		const res = await patchStudProfile(studData, token);

		if (res) {
			// getProfile(token);
			setProfileSuccess(true);
			const profile = await fetchStudentProfile(token);

			if (profile) {
				setStudentDetails(profile);
			}
		}

		setDisabled(false);
	};

	useEffect(() => {
		if (JSON.stringify(studData) === JSON.stringify(studentProfile.club)) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [studData, studentProfile]);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (studData) {
		return (
			<>
				<StudentNavbar location="Profile" />
				<Container
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "calc(100vh - 64px)",
					}}
					className="profile-section-container"
				>
					<Paper elevation={3} className={classes.contPaper}>
						<Container>
							<Grid container spacing={7}>
								<Grid
									container
									style={{ marginTop: "40px" }}
									justify="center"
								>
									<Typography
										gutterBottom
										variant="h4"
										style={{
											fontFamily: "Source Sans Pro",
											fontWeight: "600",
										}}
									>
										Profile Page
									</Typography>
								</Grid>
								<Grid item container xs={12}>
									<div
										style={{
											width: "100%",
											textAlign: "center",
											marginBottom: "30px",
										}}
									>
										<Typography
											variant="body1"
											className="light-text"
										>
											Not filling the profile may result
											in disqualification.
										</Typography>
									</div>
									<form style={{ width: "100%" }}>
										<Grid container spacing={3}>
											<Grid item xs={6}>
												<TextField
													name="name"
													className={classes.input}
													label="Name"
													variant="outlined"
													value={studData.name}
													onChange={
														handleProfileChange
													}
												/>
											</Grid>

											<Grid item xs={6}>
												<TextField
													name="branch"
													className={classes.input}
													label="Branch"
													variant="outlined"
													value={studData.branch}
													onChange={
														handleProfileChange
													}
												/>
											</Grid>

											<Grid item xs={6}>
												<TextField
													name="mobileNumber"
													className={classes.input}
													label="Contact Number"
													variant="outlined"
													value={
														studData.mobileNumber
													}
													onChange={
														handleProfileChange
													}
												/>
											</Grid>
											<Grid item xs={6}>
												<TextField
													name="registrationNumber"
													className={classes.input}
													label="VIT Registration Number"
													variant="outlined"
													value={
														studData.registrationNumber
													}
													onChange={
														handleProfileChange
													}
												/>
											</Grid>
											<Grid item xs={12}>
												<TextField
													name="bio"
													className={classes.input}
													label="Bio"
													multiline
													rows={8}
													variant="outlined"
													value={studData.bio}
													onChange={
														handleProfileChange
													}
												/>
											</Grid>
											<Grid item xs={12}>
												<Button
													variant="contained"
													color="primary"
													onClick={updateProfile}
													disabled={disabled}
												>
													Save Changes
												</Button>
											</Grid>
										</Grid>
									</form>
								</Grid>
							</Grid>
						</Container>
					</Paper>

					<Snackbar
						autoHideDuration={4000}
						onClose={() => setProfileSuccess(false)}
						open={profileSuccess}
					>
						<Alert
							severity="success"
							variant="filled"
							onClose={() => setProfileSuccess(false)}
						>
							Your profile was successfully updated!
						</Alert>
					</Snackbar>
				</Container>
			</>
		);
	} else {
		return <div></div>;
	}
};

export default StudProfile;
