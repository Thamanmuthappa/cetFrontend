import React from "react";
import {
  Grid,
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";

const TestQuestion = (props) => {
  console.log(props.question);
  return (
    <Container>
      <Grid container>{props.question.questionId.description}</Grid>
    </Container>
  );
};

export default TestQuestion;
