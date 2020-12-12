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
		border: "1px solid #E31E43",
		backgroundColor: "#E31E43",
		"&:hover": {
			backgroundColor: "#E31E43",
			transform: "scale(1.05)",
		},
	},
	textColored: {
		color: "#E31E43",
	},
	buttonStudent: {
		border: "1px solid #2C2D2D",
		backgroundColor: "#2C2D2D",
		"&:hover": {
			backgroundColor: "#2C2D2D",
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
		border: "1px solid #E45044",
		backgroundColor: "#E45044",
		"&:hover": {
			backgroundColor: "#E45044",
			transform: "scale(1.05)",
		},
	},
	header: {
		fontSize: "2.3rem",
		textAlign: "center",
	},
	header1: {
		fontSize: "3rem",
		textAlign: "center",
		margin: "5% 0",
	},
}));

function Landing(props) {
	const classes = useStyles();

	return (
		<div
			style={{
				// backgroundImage: "url(assets/longbg.png)",
				height: "100vh",
				minWidth: "calc(100vw - 15px)",
				backgroundPosition: "bottom",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				display: "flex",
				alignItems: "center",
				alignContent: "center",
			}}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} style={{ textAlign: "center" }}>
					<img src="/assets/biglogo.png" alt="logo" width="200px" />
				</Grid>
				<Grid item xs={12}>
					<h4 className={classes.header1}>
						Welcome to{" "}
						<span className={clsx(classes.textColored)}>
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
