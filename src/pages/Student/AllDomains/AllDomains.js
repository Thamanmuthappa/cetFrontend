import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ClubCarousel from "../../../components/Student/ClubCarousel/ClubCarousel";
import Loading from "../../../pages/Loading";
import { DataGrid } from "@material-ui/data-grid";
import {
  Paper,
  Button,
  Grid,
  Container,
  Typography,
  Divider,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import "../../../components/Shared/Navbar/Navbar.css";
import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import { StudentContext } from "../../../context/StudentContext";
import { useHistory } from "react-router-dom";
import AllClubs from "./AllClubs";

const AllDomains = () => {
  const [clubs, setClubs] = useState();
  const [err, setErr] = useState();
  const history = useHistory();

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace("/student/signin");
      return;
    }

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

  const { isLoggedIn } = useContext(StudentContext);

  const columns = [
    { field: "id", headerName: "S. No.", flex: 1 },
    { field: "name", headerName: "Organisation Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subcategory", headerName: "Sub-Category", flex: 1 },
    // { field: 'website', headerName: 'Website', flex: 1, },
    {
      field: "website",
      headerName: "Website",
      description:
        "This column has either social or website links for the organisations.",
      sortable: true,
      flex: 1,
      renderCell: (params) => {
        console.log(params);
        return (
          <a href={params.value} target="_blank" style={{color: "#1799E1"}}>
            {params.value}
          </a>
        );
      },
    },
  ];

  const rows = AllClubs;

  const clubsMap = (arr) => {
    if (arr.length !== 0) {
      let x = arr.map((club, i) => <ClubCarousel key={i} club={club} />);
      return x;
    } else {
      return (
        <a style={{color: "white"}}>No public organisation in this domain available right now 😞</a>
      );
    }
  };

  if (err) {
    alert("Something went wrong. Please try again.");
  } else if (clubs) {
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
      <>
        <div className="cont-color" style={{ background: "#081220" }}>
          <StudentNavbar location="Dashboard" />
          <Container style={{ marginBottom: "40px", background: "#081220" }}>
            <div style={{ display: "flex", marginTop: "40px" }}>
              <Typography
                gutterBottom
                variant="h3"
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Featured Organisations
              </Typography>
            </div>
            <Divider style={{ background: "#f5f5f540" }} />
            <Grid container style={{ marginTop: "40px" }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Technical
              </Typography>
            </Grid>
            <Grid container style={{ marginTop: "25px", marginBottom: "25px" }}>
              {clubsMap(techClubs)}
            </Grid>
            <Grid container style={{ marginTop: "40px" }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Arts and Culture
              </Typography>
              <Grid
                container
                style={{ marginTop: "25px", marginBottom: "25px" }}
              >
                {clubsMap(artsClubs)}
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "40px" }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Health and Wellness
              </Typography>
            </Grid>
            <Grid container style={{ marginTop: "25px", marginBottom: "25px" }}>
              {clubsMap(healthClubs)}
            </Grid>
            <Grid container style={{ marginTop: "40px" }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Literature
              </Typography>
            </Grid>
            <Grid container style={{ marginTop: "25px", marginBottom: "25px" }}>
              {clubsMap(litClubs)}
            </Grid>
            <Grid container style={{ marginTop: "40px" }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Social Outreach
              </Typography>
            </Grid>
            <Grid container style={{ marginTop: "25px", marginBottom: "25px" }}>
              {clubsMap(socialClubs)}
            </Grid>
            <Grid container style={{ marginTop: "40px" }}>
              <Typography
                gutterBottom
                variant="h4"
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Other Domains
              </Typography>
            </Grid>
            <Grid container style={{ marginTop: "25px", marginBottom: "40px" }}>
              {clubsMap(otherClubs)}
            </Grid>
            <div style={{ display: "flex", marginTop: "80px" }}>
              <Typography
                gutterBottom
                variant="h3"
                style={{
                  fontFamily: "Source Sans Pro",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                All Organisations
              </Typography>
            </div>
            <Divider style={{ background: "#F5F5F540" }} />
            <div
              style={{
                height: 700,
                width: "100%",
                marginTop: "40px",
                marginBottom: "40px",
                background: "#081220",
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                checkboxSelection={false}
                disableSelectionOnClick={true}
              />
            </div>
          </Container>
        </div>
        <Grid
          container
          style={{
            backgroundColor: "#FCF9F9",
            color: "#2C2D2D",
            padding: "25px",
          }}
        >
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <center>
                <a
                  href="https://www.codechefvit.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/assets/blacklogo.png"
                    alt="CodeChef-VIT"
                    width="150px"
                    align="center"
                  />
                </a>
              </center>

              <p style={{ textAlign: "center" }}>
                Imagined, Designed and Developed by{" "}
                <a
                  href="https://www.codechefvit.com"
                  style={{ color: "#1799E1" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  CodeChef-VIT
                </a>
              </p>
            </div>
          </Grid>
          {/* <Grid item xs={4}></Grid>
					<Grid
						item
						xs={4}
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<center>
							<a
								href="https://vitspot.com"
								target="_blank"
								rel="noreferrer"
							>
								<img
									src="/assets/vitspot.png"
									alt="vitspot"
									width="85px"
									align="center"
								/>
							</a>
						</center>

						<p style={{ textAlign: "center" }}>
							Powered by{" "}
							<a
								href="https://vitspot.com"
								style={{ color: "#1799E1" }}
								target="_blank"
								rel="noreferrer"
							>
								VITspot
							</a>
						</p>
					</Grid> */}
        </Grid>
      </>
    );
  } else {
    return <Loading />;
  }
};

export default AllDomains;
