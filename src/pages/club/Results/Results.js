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
import TestBox from "../../../components/TestBox/Testbox";
import { red, green, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  contPaper: {
    borderRadius: "0 0 20px 20px",
    marginTop: "10px",
    paddingBottom: "40px",
    minHeight: "80vh",
  },
  colorCode: {
    width: "20px",
    height: "20px",
    display: "inline-block",
    marginRight: "20px",
  },
}));

const Results = () => {
  const { testsCreated } = useContext(ClubContext);
  console.log(testsCreated);

  const classes = useStyles();

  let tests = testsCreated.map((data, i) => (
    <TestBox key={i} index={i} data={data} />
  ));

  return (
    <Container>
      <Paper elevation={3} className={classes.contPaper}>
        <Container>
          <div style={{ display: "flex" }}>
            <Typography
              gutterBottom
              variant='h2'
              style={{
                fontFamily: "Source Sans Pro",
                fontWeight: "600",
              }}>
              Results
            </Typography>
          </div>
          <Divider />
          <Grid container item spacing={3} style={{ textAlign: "center",marginTop: "40px", }}>
            {tests}
          </Grid>
        </Container>
      </Paper>
    </Container>
  );
};

export default Results;
