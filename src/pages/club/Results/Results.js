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
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const classes = useStyles();
  const testClickedHandler = (test) => {
    history.push(`/club/results/test/${test._id}`);
  };

  let tests = testsCreated.map((data, i) => (
    <Grid key={i} item sm={6} md={3} onClick={() => testClickedHandler(data)}>
      <ClubTestTile test={data} />
    </Grid>
  ));

  return (
    <Container>
      <div style={{ display: "flex" }}>
        <Typography
          gutterBottom
          variant='h2'
          style={{
            fontFamily: "Source Sans Pro",
            fontWeight: "600",
            color: "#fff",
            fontSize: "3rem",
            marginTop: "1rem",
          }}>
          Results
        </Typography>
      </div>
      <Divider style={{background:"#F5F5F540"}}/>
      <Grid
        container
        item
        spacing={3}
        style={{ textAlign: "center", margin: "3% 4%" }}>
        {tests}
      </Grid>
    </Container>
  );
};

export default Results;
