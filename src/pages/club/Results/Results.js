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
import { red, green, yellow } from "@material-ui/core/colors";

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
  console.log(testsCreated);

  const classes = useStyles();

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
            <div style={{ flex: "1" }}></div>
            <div style={{ display: "flex" }}>
              <div>
                <Typography
                  variant='h5'
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontWeight: "600",
                    backgroundColor: green[500],
                  }}>
                  Published
                </Typography>
              </div>
              <div>
                <Typography
                  variant='h5'
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontWeight: "600",
                    backgroundColor: yellow[500],
                  }}>
                  Finalized
                </Typography>
              </div>
              <div>
                <Typography
                  variant='h5'
                  style={{
                    fontFamily: "Source Sans Pro",
                    fontWeight: "600",
                    backgroundColor: red[500],
                  }}>
                  Unfinalized
                </Typography>
              </div>
            </div>
          </div>
          <Divider />
        </Container>
      </Paper>
    </Container>
  );
};

export default Results;
