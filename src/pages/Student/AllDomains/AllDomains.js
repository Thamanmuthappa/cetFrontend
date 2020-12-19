import React, { useEffect, useState } from "react";
import axios from "axios";
import ClubCarousel from "../../../components/Student/ClubCarousel/ClubCarousel";
import {
  Paper,
  Button,
  Grid,
  Container,
  Typography,
  Divider,
} from "@material-ui/core";

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
    let x = arr.map((club) => <ClubCarousel club={club} />);
    return x;
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

    console.log(techClubs);
    return (
      <Container>
        <div style={{ display: "flex" }}>
          <Typography
            gutterBottom
            variant='h2'
            style={{
              fontFamily: "Source Sans Pro",
              fontWeight: "600",
            }}>
            Featured CLubs
          </Typography>
        </div>
        <Divider />
        <Grid container style={{ marginTop: "20px" }}>
          <Typography
            gutterBottom
            variant='h3'
            style={{
              fontFamily: "Source Sans Pro",
              fontWeight: "600",
            }}>
            Technical
          </Typography>
        </Grid>
        <Grid container>{clubsMap(techClubs)}</Grid>
        <Grid container style={{ marginTop: "20px" }}>
          <Typography
            gutterBottom
            variant='h3'
            style={{
              fontFamily: "Source Sans Pro",
              fontWeight: "600",
            }}>
            Arts and Culture
          </Typography>
        </Grid>
        <Grid container>{clubsMap(artsClubs)}</Grid>
        <Grid container style={{ marginTop: "20px" }}>
          <Typography
            gutterBottom
            variant='h3'
            style={{
              fontFamily: "Source Sans Pro",
              fontWeight: "600",
            }}>
            Social Outreach
          </Typography>
        </Grid>
        <Grid container>{clubsMap(socialClubs)}</Grid>
        <Grid container style={{ marginTop: "20px" }}>
          <Typography
            gutterBottom
            variant='h3'
            style={{
              fontFamily: "Source Sans Pro",
              fontWeight: "600",
            }}>
            Health and Wellness
          </Typography>
        </Grid>
        <Grid container>{clubsMap(healthClubs)}</Grid>
        <Grid container style={{ marginTop: "20px" }}>
          <Typography
            gutterBottom
            variant='h3'
            style={{
              fontFamily: "Source Sans Pro",
              fontWeight: "600",
            }}>
            literature
          </Typography>
        </Grid>
        <Grid container>{clubsMap(litClubs)}</Grid>
        <Grid container style={{ marginTop: "20px" }}>
          <Typography
            gutterBottom
            variant='h3'
            style={{
              fontFamily: "Source Sans Pro",
              fontWeight: "600",
            }}>
            Other
          </Typography>
        </Grid>
        <Grid container>{clubsMap(otherClubs)}</Grid>
      </Container>
    );
  } else {
    return <div>loading</div>;
  }
};

export default AllDomains;
