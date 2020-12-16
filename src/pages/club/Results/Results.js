import React, { useContext } from "react";
import { ClubContext } from "../../../context/ClubContext";
import {
	Paper,
	Button,
	Container,
	Divider,
	Typography,
	makeStyles,
	Grid,
} from "@material-ui/core";
import "../../../components/Club/TestTile/TestTile.css";
import ClubTestTile from "../../../components/Club/TestTile/TestTile";

const useStyles = makeStyles((theme) => ({
	contPaper: {
		borderRadius: "0 0 20px 20px",
		marginTop: "10px",
		paddingBottom: "40px",
		minHeight: "80vh",
	},
}));

const Results = () => {
	const { testsCreated } = useContext(ClubContext);

	const classes = useStyles();

	let tests = testsCreated.map((data, i) => (
		<Grid item sm={6} md={3}>
			<ClubTestTile key={i} test={data} />
		</Grid>
	));

	return (
		<Container>
			<div style={{ display: "flex" }}>
				<Typography
					gutterBottom
					variant="h2"
					style={{
						fontFamily: "Source Sans Pro",
						fontWeight: "600",
					}}
				>
					Results
				</Typography>
			</div>
			<Divider />
			<Grid
				container
				item
				spacing={3}
				style={{ textAlign: "center", margin: "3% 4%" }}
			>
				{tests}
			</Grid>
		</Container>
	);
};

export default Results;
