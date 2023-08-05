import {
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	Hidden,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { ClubContext } from "../../context/ClubContext";

const useStyles = makeStyles((theme) => ({
	media: {
		height: 140,
	},
	paper: {
		position: "absolute",
		width: "400",
		backgroundColor: "#081220",
		border: "1px solid #1799E1",
		borderRadius: "10px",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
	root: {
		overflow: "hidden",
		backgroundColor: "#252D3A",
		boxShadow: "4px 4px 50px rgba(0, 0, 0, 0.05)",
		borderRadius: "30px",
		textAlign: "center",
		height: "auto",
		width: "70%",
		margin: "0 auto",
	},
	gridList: {
		width: 800,
		height: 450,
	},
	gridContainer: {
		height: "100%",
	},
	gridContainerBox: {
		width: "100%",
		margin: 0,
		padding: "2rem",
	},
	cardContent: {
		textAlign: "center",
		fontFamily: "Source Sans Pro",
		fontSize: "1rem",
	},
	gridItemContainer: {
		margin: "0 auto",
	},
}));

const ClubSignin = () => {
	const classes = useStyles();

	const { isLoggedIn, setClubDetails, setLoginTrue } = useContext(
		ClubContext
	);

	const { register, handleSubmit, errors } = useForm();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [redirect, setRedirect] = useState(false);

	const [loading, setLoading] = useState(false);

	const handleFormSubmit = async () => {
		setLoading(true);
		const url = `${process.env.REACT_APP_BACKEND_URL}/club/login`;
		const data = {
			email,
			password,
		};

		try {
			await Axios.post(url, data).then((res) => {
				localStorage.setItem("clubAuthToken", res.data.token);
				setClubDetails(res.data.clubDetails);
				setLoginTrue(res.data.token);
				setLoading(false);
			});
		} catch (error) {
			if (error.response.status === 401) {
				alert("Wrong credentials!");
			} else if (error.response.status === 400) {
				alert("Looks like you didn't enter all details.");
			} else {
				alert("Oops looks like something is wrong!");
			}
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			setRedirect(true);
		}
	}, [isLoggedIn]);

	if (redirect) {
		return <Redirect to="/club/dashboard" />;
	}

	return (
		<div
			className="bg-image"
			style={{
				backgroundSize: "cover",
				height: "100vh",
				width: "100%",
				backgroundPosition: "top",
				backgroundColor: "#081220",
			}}
		>
			<Link to="/">
				<img
					src="/assets/Group2.png"
					alt="logo"
					style={{
						textAlign: "left",
						width: "6%",
						height: "auto",
						position: "absolute",
						left: "7rem",
						top: "3rem",
						
					}}
				/>
			</Link>
			<Grid
				container
				alignItems="center"
				className={classes.gridContainer}
				spacing={0}
			>
				<Hidden mdDown>
					<Grid item xs={6} style={{ textAlign: "center" }}>
						<img
							src="/assets/celebration.png"
							alt="celebration"
							width="70%"
							height="70%"
						/>
					</Grid>
				</Hidden>
				<Grid item container sm={12} md={6}>
					<form onSubmit={handleSubmit(handleFormSubmit)}>
						<Card className={classes.root}>
							<CardContent className={classes.cardContent}>
								<Grid
									container
									spacing={2}
									className={classes.gridContainerBox}
								>
									<Grid item xs={12}>
										<Typography
											gutterBottom
											variant="h4"
											component="h2"
											style={{
												fontFamily: "Source Sans Pro",
												fontWeight: "600",
												color: "#fff",
											}}
										>
											Welcome Back!
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography
											variant="body2"
											component="p"
											style={{
												color: "#fff",
											}}
										>
											Sign in to your account
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<TextField
											name="email"
											defaultValue={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
											label="Email *"
											variant="outlined"
											type="email"
											className="form-input"
											inputRef={register({
												required: true,
											})}
											error={errors.email}
											helperText={
												errors.email &&
												"Email is required"
											}
											// style={{ backgroundColor: "#252D3A" }}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											name="password"
											defaultValue={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											label="Password *"
											variant="outlined"
											type="password"
											className="form-input"
											inputRef={register({
												required: true,
												minLength: 8,
											})}
											error={errors.password}
											helperText={
												errors.password &&
												"Password should be at least 8 characters long!"
											}
										/>
									</Grid>
									<Grid item xs={12}></Grid>

									{/* <Grid item
                                        xs={12}>
                                        <p style={
                                            { textAlign: "center" }
                                        }>
                                            Don't have an account?{" "}
                                            <span style={
                                                { color: "#1799E1" }
                                            }>
                                                <Link to="/club/signup"
                                                    style={
                                                        { marginRight: "10px" }
                                                }>
                                                    Sign Up
                                                </Link>
                                            </span>
                                        </p>
                                    </Grid> */}

									<Grid item xs={12}>
										<Button
											type="submit"
											variant="contained"
											style={{
												textTransform: "capitalize",
												border: "1px solid #1799E1",
												backgroundColor: "#1799E1",
												color: "white",
												fontFamily: "Source Sans Pro",
												height: "48px",
												width: "188px",
												borderRadius: "10px",
												fontSize: "18px",
												fontWeight: "600",
												lineHeight: "150%",
												outline: "none",
											}}
											disabled={loading}
										>
											{!loading ? (
												"Sign In"
											) : (
												<CircularProgress
													size={20}
													style={{ color: "white" }}
												/>
											)}{" "}
										</Button>
									</Grid>
								</Grid>

								<br />
							</CardContent>
						</Card>
					</form>
				</Grid>
			</Grid>
		</div>
	);
};

export default ClubSignin;
