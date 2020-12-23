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
import StarBG from "../stars-bg.png";
import "./CCProfile.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: "150px",
        height: "150px",
        marginTop:"60px"
	},
	contPaper: {
		width: "100%",
		borderRadius: "20px",
		paddingBottom: "40px",
	},
	website: {
		"&:hf": {
			cursor: "pointer",
		},
	},
}));

const CCProfile = (props) => {
	const classes = useStyles();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchProfile = async () => {
		const url = `${process.env.REACT_APP_BACKEND_URL}/club/details/username?username=codechefvit`;

		try {
			await Axios.get(url).then((res) => {
				setData(res.data.club);

				if (res.data.club === null) {
					setError(true);
				}
			});
		} catch (error) {
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
				backgroundImage: `url(${StarBG})`,
				backgroundColor: "black",
				backgroundSize: "cover",
				backgroundPosition: "center center",
				fontFamily: "Saira",
			}}
			className="org-profile-container profile-section-container"
		>
			<div className={classes.contPaper}>
				<AppBar
					className="navbar"
					style={{
						backgroundColor: "transparent",
						zIndex: "1400",
						position: "relative",
					}}
					elevation={2}
				>
					<Toolbar>
						<Link
							to={`/student/dashboard`}
							style={{ marginRight: "20px" }}
						>
							<img
								src="/assets/gold-cet.svg"
								alt="logo"
								width="65px"
							/>
						</Link>
						<Typography
							variant="h5"
							style={{
								flex: 1,
								color: "#FFBC27",
								fontWeight: "bold",
							}}
						>
							Dashboard
						</Typography>
						<Button
							style={{
								fontWeight: "bold",
								fontSize: "1rem",
								border: "1px solid #FFBC27",
								color: "#FFBC27",
							}}
							href="/"
						>
							LogOut
						</Button>
					</Toolbar>
				</AppBar>
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
									color: "#FFBC27",
								}}
							>
								{data.name}{" "}
							</Typography>
						</Grid>
						<Grid
							container
							style={{ marginTop: "40px" }}
							justify="center"
						>
							<img
								src="/assets/recruiting-now.svg"
								alt="Recruiting Now"
							/>
						</Grid>
						<Grid item container xs={12}>
							<form style={{ width: "100%" }}>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<div
											name="type"
											label="Type"
											variant="outlined"
											style={{
												textAlign: "center",
												color: "#ffffff",
												fontSize: "24px",
											}}
										>
											Management&nbsp;&nbsp;&nbsp;&nbsp;Technical&nbsp;&nbsp;&nbsp;&nbsp;Design{" "}
										</div>
									</Grid>
									<Grid item xs={12}>
										<div
											name="bio"
											label="Description"
											style={{
												textAlign: "center",
												color: "#ffffff",
												fontSize: "20px",
											}}
										>
											{data.bio}{" "}
										</div>
									</Grid>
									<Grid item xs={12}>
										<div
											name="bio"
											label="Website"
											style={{
												textAlign: "center",
												marginTop: "25px",
												textDecoration: "underline",
												textDecorationColor: "#FFBC27",
											}}
										>
											<a
												href={data.website}
												className="org-website-link"
												rel="noreferrer"
												target="_blank"
												style={{
													textAlign: "center",
													fontSize: "24px",
													color: "#FFBC27",
													textDecoration: "underline",
													textDecorationColor:
														"#FFBC27",
												}}
											>
												www.codechefvit.com{" "}
											</a>{" "}
										</div>
									</Grid>
									<Grid item xs={12}>
										<div
											name="mobileNumber"
											label="Contact Number"
											variant="outlined"
											style={{
												textAlign: "center",
												color: "#ffffff",
												fontSize: "20px",
											}}
										>
											{data.mobileNumber}{" "}
										</div>
									</Grid>
									<Grid
										item
										xs={12}
										style={{
											marginTop: "2%",
											textAlign: "center",
										}}
									>
										<a
											href={
												data.typeOfPartner ===
													"Micro" ||
												data.typeOfPartner === "Nano"
													? data.redirectURL
													: `/student/club/${data._id}`
											}
											rel="noreferrer"
											target="_blank"
										>
											<Button
												variant="contained"
												color="primary"
												style={{
													paddingTop: "15px",
													paddingBottom: "15px",
													textTransform: "capitalize",
													border: "1px solid #FFBC27",
													backgroundColor: "#FFBC27",
													color: "#000000",
													fontWeight: "normal",
													outline: "none",
													marginBottom: "70px",
													borderRadius: "0",
													width: "180px",
													fontFamily: "Star Jedi",
													fontSize: "20px",
													lineHeight: "145%",
													letterSpacing: "0.01em",
												}}
											>
												Apply Now
											</Button>
										</a>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Container>
				<Grid>
					<center>
						<a
							href="https://www.codechefvit.com"
							target="_blank"
							rel="noreferrer"
						>
							<img
								src="/assets/goldCC.png"
								alt="CodeChef-VIT"
								width="150px"
								align="center"
							/>
						</a>
					</center>
					<p
						style={{
							textAlign: "center",
							color: "#FFFFFF",
						}}
					>
						Imagined, Designed and Developed by&nbsp;
						<a
							href="https://www.codechefvit.com"
							style={{ color: "#FFBC27" }}
							target="_blank"
							rel="noreferrer"
						>
							CodeChef-VIT
						</a>
					</p>
					<center>
						<Button
							target="_blank"
							href="https://github.com/CodeChefVIT"
						>
							<GitHubIcon style={{ color: "#FFBC27" }} />
						</Button>
						<Button
							target="_blank"
							href="https://www.instagram.com/codechefvit/"
						>
							<InstagramIcon style={{ color: "#FFBC27" }} />
						</Button>
						<Button target="_blank" href="facebook.com/codechefvit">
							<FacebookIcon style={{ color: "#FFBC27" }} />
						</Button>
						<Button
							target="_blank"
							href="https://twitter.com/codechefvit"
						>
							<TwitterIcon style={{ color: "#FFBC27" }} />
						</Button>
						<Button
							target="_blank"
							href="https://www.youtube.com/c/CodeChefVIT"
						>
							<YouTubeIcon style={{ color: "#FFBC27" }} />
						</Button>
						<Button
							target="_blank"
							href="mailto:codechefvit@gmail.com"
						>
							<EmailIcon style={{ color: "#FFBC27" }} />
						</Button>
						<Button
							target="_blank"
							href="https://www.linkedin.com/company/codechef-vit-chapter"
						>
							<LinkedInIcon style={{ color: "#FFBC27" }} />
						</Button>
					</center>
				</Grid>
			</div>
		</div>
	);
};

export default CCProfile;
