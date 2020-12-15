import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
// club avatar ,club banner ,socoial links, images

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: "200px",
		height: "200px",
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
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	useEffect(() => {
		var config = {
			method: "get",
			url: `${process.env.REACT_APP_BACKEND_URL}/club/profile`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem(
					"clubAuthToken"
				)}`,
			},
		};

		axios(config)
			.then(function (response) {
				setData(response.data);
			})
			.catch(function (error) {
				console.log(error);
				setError(error);
			});
	}, []);

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
									variant="h2"
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
											<TextField
												className={classes.input}
												label="Name"
												variant="outlined"
												placeholder={data.club.name}
											/>
										</Grid>
										<Grid item xs={6}>
											<TextField
												className={classes.input}
												label="Type"
												variant="outlined"
												placeholder={data.club.type}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												className={classes.input}
												label="Description"
												multiline
												rows={8}
												variant="outlined"
												placeholder="change after it comes from api"
											/>
										</Grid>
										<Grid item xs={12}>
											<Button
												variant="contained"
												color="primary"
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
			</Container>
		);
	} else {
		return <ul>Loading...</ul>;
	}
};

export default ClubProfile;
