import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClubCarousel from "../../../components/Student/ClubCarousel/ClubCarousel";
import Loading from '../../../pages/Loading';
import {
  Paper,
  Button,
  Grid,
  Container,
  Typography,
  Divider,
  AppBar,
  Toolbar
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import '../../../components/Shared/Navbar/Navbar.css';

const AllDomains = () => {
  const [clubs, setClubs] = useState();
  const [err, setErr] = useState();
  useEffect(() => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BACKEND_URL}/club/allFeatured`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setClubs(response.data);
      })
      .catch(function (error) {
        setErr(error);
      });
  }, []);

  const clubsMap = (arr) => {
    if (arr.length != 0) {
      let x = arr.map((club) => <ClubCarousel club={club} />);
      return x;
    }
    else {
      return "No public organisation in this domain available right now 😞";
    }
  };

  if (err) {
    console.log(err);
    alert("Something went wrong. Please try again.");
  } else if (clubs) {
    console.log(clubs);
    let techClubs = [];
    let artsClubs = [];
    let socialClubs = [];
    let healthClubs = [];
    let litClubs = [];
    let otherClubs = [];
    for (let x in clubs.clubs) {
      if (clubs.clubs[x].type.toLowerCase() === "technical") {
        techClubs.push(clubs.clubs[x]);
      }
      if (clubs.clubs[x].type.toLowerCase() === "arts and culture") {
        artsClubs.push(clubs.clubs[x]);
      }
      if (clubs.clubs[x].type.toLowerCase() === "social outreach") {
        socialClubs.push(clubs.clubs[x]);
      }
      if (clubs.clubs[x].type.toLowerCase() === "health and wellness") {
        healthClubs.push(clubs.clubs[x]);
      }
      if (clubs.clubs[x].type.toLowerCase() === "literature") {
        litClubs.push(clubs.clubs[x]);
      }
      if (clubs.clubs[x].type.toLowerCase() === "other") {
        otherClubs.push(clubs.clubs[x]);
      }
    }
    return (
      <div>
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
        <Container style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", marginTop: "40px" }}>
            <Typography
              gutterBottom
              variant='h3'
              style={{
                fontFamily: "Source Sans Pro",
                fontWeight: "600",
              }}>
              Featured Clubs
          </Typography>
          </div>
          <Divider />
          <Grid container style={{ marginTop: "40px" }}>
            <Typography
              gutterBottom
              variant='h4'
              style={{
                fontFamily: "Source Sans Pro",
                fontWeight: "600",
              }}>
              Technical
          </Typography>
          </Grid>
          <Grid container style={{ marginTop: "40px", marginBottom: "40px" }}>{clubsMap(techClubs)}</Grid>
          <Grid container style={{ marginTop: "40px" }}>
            <Typography
              gutterBottom
              variant='h4'
              style={{
                fontFamily: "Source Sans Pro",
                fontWeight: "600",
              }}>
              Arts and Culture
          </Typography>
          </Grid>
          <Grid container style={{ marginTop: "40px", marginBottom: "40px" }}>{clubsMap(artsClubs)}</Grid>
          <Grid container style={{ marginTop: "40px" }}>
            <Typography
              gutterBottom
              variant='h4'
              style={{
                fontFamily: "Source Sans Pro",
                fontWeight: "600",
              }}>
              Social Outreach
          </Typography>
          </Grid>
          <Grid container style={{ marginTop: "40px", marginBottom: "40px" }}>{clubsMap(socialClubs)}</Grid>
          <Grid container style={{ marginTop: "40px" }}>
            <Typography
              gutterBottom
              variant='h4'
              style={{
                fontFamily: "Source Sans Pro",
                fontWeight: "600",
              }}>
              Health and Wellness
          </Typography>
          </Grid>
          <Grid container style={{ marginTop: "40px", marginBottom: "40px" }}>{clubsMap(healthClubs)}</Grid>
          <Grid container style={{ marginTop: "40px" }}>
            <Typography
              gutterBottom
              variant='h4'
              style={{
                fontFamily: "Source Sans Pro",
                fontWeight: "600",
              }}>
              Literature
          </Typography>
          </Grid>
          <Grid container style={{ marginTop: "40px", marginBottom: "40px" }}>{clubsMap(litClubs)}</Grid>
          <Grid container style={{ marginTop: "40px" }}>
            <Typography
              gutterBottom
              variant='h4'
              style={{
                fontFamily: "Source Sans Pro",
                fontWeight: "600",
              }}>
              Other
          </Typography>
          </Grid>
          <Grid container style={{ marginTop: "40px", marginBottom: "40px" }}>{clubsMap(otherClubs)}</Grid>
        </Container>
        <Grid style={{ backgroundColor: "#FCF9F9", color: "#2C2D2D", padding: "25px" }}>
          <center>
            <a href="https://www.codechefvit.com" target="_blank"><img src="/assets/blacklogo.png" alt="CodeChef-VIT" width="150px" align="center" /></a>
          </center>
          <p style={{ textAlign: "center" }}>Imagined, Designed and Developed by <a href="https://www.codechefvit.com" style={{ color: "#E31E43" }} target="_blank">CodeChef-VIT</a></p>
        </Grid>
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default AllDomains;