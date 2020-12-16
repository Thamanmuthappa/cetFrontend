import React from "react";
import "./TestBox.css";
import { Grid, Paper, Typography } from "@material-ui/core";

const Testbox = (props) => {
  console.log(props.data);

  return (
    <Grid item>
      <Paper
        className='testPap'
        style={{
          backgroundColor: "red",
        }}>
        <div className='testBox'>
          <div>
            <Typography variant='h4' style={{
          color: "white",
        }}>
              Test : {props.data.roundNumber}
            </Typography>
          </div>
          <div>
            <Typography variant='h5' style={{
          color: "white",
        }}>
              Round Type : {props.data.roundType}
            </Typography>
          </div>
        </div>
      </Paper>
    </Grid>
  );
};

export default Testbox;
