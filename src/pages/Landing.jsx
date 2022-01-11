import { Button, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	button: {
		textTransform: "capitalize",
		color: "white",
		fontFamily: "Source Sans Pro",
		borderRadius: "1rem",
		fontSize: "1.3rem",
		fontWeight: "600",
		// lineHeight: "150%",
		outline: "none",
		padding: " 0.8rem 5rem",
		transition: "all .4s",
	},
	buttonTeacher: {
		border: "1px solid #1799E1",
		backgroundColor: "#1799E1",
		"&:hover": {
			backgroundColor: "#1799E1",
			transform: "scale(1.05)",
		},
	},
	textColored: {
		color: "#1799E1",
	},
	buttonStudent: {
		border: "1px solid #1799E1",
		backgroundColor: "#1799E1",
		"&:hover": {
			backgroundColor: "#1799E1",
			transform: "scale(1.05)",
		},
	},
	buttonOrganisation: {
		textTransform: "capitalize",
		color: "white",
		fontFamily: "Source Sans Pro",
		borderRadius: "1rem",
		fontSize: "1.8rem",
		fontWeight: "600",
		lineHeight: "150%",
		outline: "none",
		padding: " 1.2rem 5rem",
		transition: "all .4s",
		border: "1px solid #1799E1",
		backgroundColor: "#1799E1",
		"&:hover": {
			backgroundColor: "#1799E1",
			transform: "scale(1.05)",
		},
	},
	header: {
		fontSize: "2.3rem",
		textAlign: "center",
		color: "#fff",
	},
	header1: {
		fontSize: "3rem",
		textAlign: "center",
		margin: "5% 0",
		color: "#fff",
	},
}));

function Landing() {
	const classes = useStyles();

	return (
		<div
			style={{
				backgroundImage: "url(/assets/homebg.png)",
				height: "100vh",
				width: "calc(100vw - 15px)",
				backgroundPosition: "bottom",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				display: "flex",
				alignItems: "center",
				alignContent: "center",
				background: "#081220",
			}}
		>
			<Grid container spacing={2}>
				{/* <Grid item xs={12} style={{ textAlign: "center" }}>
					<img src="/assets/greydoor.png" alt="logo" height="200px" />
				</Grid> */}
				<Grid item xs={12}>
					<h4 className={classes.header1}>
						Welcome to{" "}
						<span className={classes.textColored}>
							Common Entry Test
						</span>
					</h4>
				</Grid>
				<Grid item xs={12}>
					<p className={classes.header}>Make your choice &darr;</p>
				</Grid>
				<Grid item container xs={12} justify="space-around">
					<Grid item>
						<Link
							to="/club/signin"
							style={{
								textDecoration: "None",
								textTransform: "capitalize",
							}}
						>
							<Button
								variant="contained"
								className={clsx(
									classes.button,
									classes.buttonTeacher
								)}
							>
								Club Lead
							</Button>
						</Link>
					</Grid>
					<Grid item>
						<Link
							to="/student/signin"
							style={{ textDecoration: "None" }}
						>
							<Button
								variant="contained"
								className={clsx(
									classes.button,
									classes.buttonStudent
								)}
							>
								Student
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
export default Landing;
