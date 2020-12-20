import {
	Avatar,
	Button,
	Container,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Typography,
	AppBar,
	Toolbar,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { black } from "color-name";
import "./ClubProfile.css";
import "../components/Shared/Navbar/Navbar.css";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: "150px",
		height: "150px",
	},
	contPaper: {
		width: "100%",
		borderRadius: "20px",

		paddingBottom: "40px",
	},
	input: {
		width: "100%",
		border: "none",
	},
	inputBorder: {
		width: "85%",
		border: "1px solid #C4C4C4",
		borderRadius: "5px",
		padding: "20px",
	},
	inputBorderTA: {
		width: "91%",
		border: "1px solid #C4C4C4",
		borderRadius: "5px",
		padding: "30px",
	},
	website: {
		"&:hover": {
			cursor: "pointer",
		},
	},
	root: {
		"&.MuiInputBase-input.Mui-disabled": {
			color: "#000000",
		},
	},
}));

const OrgProfile = (props) => {
	const classes = useStyles();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const username = props.match.params.username;

	const fetchProfile = async () => {
		const url = `${process.env.REACT_APP_BACKEND_URL}/club/details/username?username=${username}`;

		try {
			await Axios.get(url).then((res) => {
				console.log(res);
				setData(res.data.club);

				if (res.data.club === null) {
					setError(true);
				}
			});
		} catch (error) {
			console.log(error);
			setError(true);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	if (loading) {
		return <Loading />;
	} else if (error) {
		return <ErrorPage />;
	}

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			className="org-profile-container profile-section-container"
		>
			<div className={classes.contPaper}>
				<AppBar
					className="navbar"
					style={{
						backgroundColor: "#fdf9f9",
						zIndex: "1400",
						position: "relative",
					}}
					elevation={2}
				>
					<Toolbar>
						<Link to={`/student/dashboard`}>
							<img
								src="/assets/Group2.png"
								alt="logo"
								className="nav-img"
							/>
						</Link>
						<Typography
							variant="h5"
							className="nav-brand"
							style={{ flex: 1 }}
						>
							Dashboard
						</Typography>
						<Button className="logout-btn-nav" href="/">
							LogOut
						</Button>
					</Toolbar>
				</AppBar>
				<Grid container>
					<img
						src={
							data.clubBanner
								? data.clubBanner
								: "/assets/bannerIMG.jpg"
						}
						width="100%"
						alt="banner img"
						className="profile-banner"
					></img>
				</Grid>
				<Container>
					<Grid container spacing={7}>
						<Grid container justify="center">
							<Avatar
								alt="Club logo"
								src={
									data.clubAvatar
										? data.clubAvatar
										: "/assets/avatar.jpeg"
								}
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
								<Grid container spacing={3}>
									<Grid item xs={6}>
										<Typography
											style={{ color: "#494F55" }}
										>
											Name
										</Typography>
										<div
											name="name"
											className={classes.inputBorder}
											label="Name"
											variant="outlined"
										>
											{data.name}{" "}
										</div>
									</Grid>
									<Grid item xs={6}>
										<Typography
											style={{ color: "#494F55" }}
										>
											Type
										</Typography>
										<div
											name="type"
											className={classes.inputBorder}
											label="Type"
											variant="outlined"
										>
											{data.type}
										</div>
									</Grid>
									<Grid item xs={12}>
										<Typography
											style={{ color: "#494F55" }}
										>
											Description
										</Typography>
										<div
											name="bio"
											className={classes.inputBorderTA}
											label="Description"
											multiline
											rows={8}
											variant="outlined"
										>
											{data.bio}{" "}
										</div>
									</Grid>
									<Grid item xs={6}>
										<a
											href={data.website}
											className="org-website-link"
											rel="noreferrer"
											target="_blank"
										>
											<Typography
												style={{ color: "#494F55" }}
											>
												Organisation Link
											</Typography>
											<div
												name="website"
												className={classes.inputBorder}
												label="Organisation Link"
												variant="outlined"
											>
												{data.website}
											</div>
										</a>
									</Grid>
									<Grid item xs={6}>
										<Typography
											style={{ color: "#494F55" }}
										>
											Contact Number
										</Typography>
										<div
											name="mobileNumber"
											className={classes.inputBorder}
											label="Contact Number"
											variant="outlined"
										>
											{data.mobileNumber}
										</div>
									</Grid>
									<Grid
										item
										xs={12}
										style={{
											marginTop: "5%",
											textAlign: "center",
										}}
									>
										<Link to={`/student/club/${data._id}`}>
											<Button
												variant="contained"
												color="primary"
												className="custom-action-btn"
												style={{
													paddingTop: "15px",
													paddingBottom: "15px",
													textTransform: "capitalize",
													border: "1px solid #E31E43",
													backgroundColor: "#E31E43",
													color: "white",
													fontFamily:
														"Source Sans Pro",
													borderRadius: "10px",
													fontSize: "18px",
													fontWeight: "600",
													lineHeight: "150%",
													outline: "none",
													marginBottom: "40px",
												}}
											>
												Apply Now
											</Button>
										</Link>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Container>
				<Grid
					style={{
						backgroundColor: "#FCF9F9",
						color: "#2C2D2D",
						padding: "25px",
						marginTop: "40px",
					}}
				>
					<center>
						<a href="https://www.codechefvit.com" target="_blank">
							<img
								src="/assets/blacklogo.png"
								alt="CodeChef-VIT"
								width="150px"
								align="center"
							/>
						</a>
					</center>
					<p style={{ textAlign: "center" }}>
						Imagined, Designed and Developed by&nbsp;
						<a
							href="https://www.codechefvit.com"
							style={{ color: "#E31E43" }}
							target="_blank"
						>
							CodeChef-VIT
						</a>
					</p>
				</Grid>
			</div>
		</div>
	);
};

export default OrgProfile;
