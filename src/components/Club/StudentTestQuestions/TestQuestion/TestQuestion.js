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
  let ans = null;
  console.log(props.question.questionType);

  if (props.question.questionType === "singleCorrect") {
    console.log(props.question.questionId.options[0].option.text);
    let markedid =
    ans = (
      <Grid container>
        <Grid container item>
          <Grid item xs={12} sm={6}>
            a. {props.question.questionId.options[0].option.text}
          </Grid>
          <Grid item xs={12} sm={6}>
            b. {props.question.questionId.options[1].option.text}
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={6}>
            c. {props.question.questionId.options[2].option.text}
          </Grid>
          <Grid item xs={12} sm={6}>
            d. {props.question.questionId.options[3].option.text}
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={12} sm={6}>
            marked answer : {props.question.questionId.options[2].option.text}
          </Grid>
          <Grid item xs={12} sm={6}>
            correct answer : {props.question.questionId.options[3].option.text}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (props.question.questionType === "multipleCorrect") {

  } else if (props.question.questionType === "longAnswer") {
  } else if (props.question.questionType === "shortAnswer") {
  }
  return (
    <Container>
      <Grid container>
        <Typography>{"Q. " + props.question.questionId.description}</Typography>
      </Grid>
      {ans}
    </Container>
  );
};

export default TestQuestion;
