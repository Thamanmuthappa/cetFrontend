import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
	Paper,
	Avatar,
	Container,
	Button,
	Grid,
	makeStyles,
	TextField,
	Typography,
	FormControlLabel,
	Switch,
	Tooltip,
	Snackbar,
} from "@material-ui/core";
import { ClubContext } from "../../../context/ClubContext";
import { Alert } from "@material-ui/lab";
import { patchProfile } from "../../../API/PATCH";
// club avatar ,club banner ,socoial links, images

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: "150px",
		height: "150px",
	},
	contPaper: {
		borderRadius: "20px",
		marginTop: "10px",
		paddingBottom: "40px",
	},
	input: {
		width: "100%",
	},
}));

const ClubProfile = () => {
	const classes = useStyles();

	const { clubDetails, setFeatured, getProfile } = useContext(ClubContext);

	const [error, setError] = useState(null);
	const [data, setData] = useState(clubDetails.club);

	const [disabled, setDisabled] = useState(true);

	const [featureLoading, setFeatureLoading] = useState(false);
	const [featureSuccess, setFeatureSuccess] = useState(false);
	const [profileSuccess, setProfileSuccess] = useState(false);

	const handleProfileChange = (e) => {
		setData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleFeaturedChange = async (e) => {
		setFeatureLoading(true);
		const curr = data.featured;

		const url = `${process.env.REACT_APP_BACKEND_URL}/club/feature`;
		const token = localStorage.getItem("clubAuthToken");

		const patch = {
			featured: !curr,
		};

		try {
			await axios
				.patch(url, patch, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) => {
					console.log(res);
					setFeatureSuccess(true);
					setFeatured(!curr);

					setData((prevState) => ({
						...prevState,
						featured: !curr,
					}));
				});
		} catch (error) {
			console.log(error);
		}

		setFeatureLoading(false);
	};

	const updateProfile = async () => {
		setDisabled(true);
		const token = localStorage.getItem("clubAuthToken");

		const res = await patchProfile(data, token);

		if (res) {
			getProfile(token);
			setProfileSuccess(true);
		}

		setDisabled(false);
	};

	useEffect(() => {
		console.log(data, clubDetails.club);
		if (JSON.stringify(data) === JSON.stringify(clubDetails.club)) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [data, clubDetails]);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (data) {
		return (
			<Container>
				<Paper elevation={3} className={classes.contPaper}>
					<Grid container>
						<img
							src="/assets/bannerIMG.jpg"
							width="100%"
							alt="banner img"
						></img>
					</Grid>
					<Container>
						<Grid container spacing={7}>
							<Grid container justify="center">
								<Avatar
									alt="Club logo"
									src="/assets/avatar.jpeg"
									className={classes.avatar}
								/>
							</Grid>
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
								<form style={{ width: "100%" }}>
									<Tooltip
										title={
											<span style={{ fontSize: "1rem" }}>
												Turning this ON will make your
												profile public for the students
												on CET.
											</span>
										}
										arrow
									>
										<FormControlLabel
											control={
												<Switch
													checked={data.featured}
													disabled={featureLoading}
													onChange={
														handleFeaturedChange
													}
												/>
											}
											label="Feature your club"
											labelPlacement="start"
											style={{ marginBottom: "20px" }}
										/>
									</Tooltip>
									<Grid container spacing={3}>
										<Grid item xs={6}>
											<TextField
												name="name"
												className={classes.input}
												label="Name"
												variant="outlined"
												value={data.name}
												onChange={handleProfileChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name="type"
												className={classes.input}
												label="Type"
												variant="outlined"
												value={data.type}
												onChange={handleProfileChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												name="bio"
												className={classes.input}
												label="Description"
												multiline
												rows={8}
												variant="outlined"
												value={data.bio}
												onChange={handleProfileChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name="website"
												className={classes.input}
												label="Club Website Link"
												variant="outlined"
												value={data.website}
												onChange={handleProfileChange}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												name="mobileNumber"
												className={classes.input}
												label="Club Contact Number"
												variant="outlined"
												value={data.mobileNumber}
												onChange={handleProfileChange}
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
							{/* <Grid item xs={9}>
                <div>
                  <Typography
                    gutterBottom
                    variant='h5'
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontWeight: "600",
                    }}>
                    name : {data.club.name}
                  </Typography>
                </div>
                <div>
                  <Typography
                    gutterBottom
                    variant='h5'
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontWeight: "600",
                    }}>
                    type : {data.club.type}
                  </Typography>
                </div>
                <div>
                  <Typography
                    gutterBottom
                    variant='h5'
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontWeight: "600",
                    }}>
                    description :
                  </Typography>
                </div>
              </Grid> */}
						</Grid>
					</Container>
				</Paper>
				<Snackbar
					autoHideDuration={4000}
					onClose={() => setFeatureSuccess(false)}
					open={featureSuccess}
				>
					<Alert
						severity="success"
						variant="filled"
						onClose={() => setFeatureSuccess(false)}
					>
						Your profile was successfully made{" "}
						{data.featured ? "public" : "private"}!
					</Alert>
				</Snackbar>
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
		);
	}
};

export default ClubProfile;
