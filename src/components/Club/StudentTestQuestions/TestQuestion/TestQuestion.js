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

  if (props.question.questionType === "singleCorrect") {
    let markedId = props.question.answers;
    let marked = null;
    let correctId = props.question.correctAnswer;
    let correct = null;
    for (let x in props.question.questionId.options) {
      if (props.question.questionId.options[x]._id === markedId) {
        marked = props.question.questionId.options[x].option.text;
      }
      if (props.question.questionId.options[x]._id === correctId) {
        correct = props.question.questionId.options[x].option.text;
      }
    }

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
            marked answer : {marked}
          </Grid>
          <Grid item xs={12} sm={6}>
            correct answer : {correct}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (props.question.questionType === "multipleCorrect") {
    let markedId;
    let marked = "";
    let correctId;
    let correct = "";

    for (let y in props.question.answers) {
      markedId = props.question.answers[y];
      correctId = props.question.correctAnswer[y];

      for (let x in props.question.questionId.options) {
        if (props.question.questionId.options[x]._id === markedId) {
          marked += props.question.questionId.options[x].option.text;
          marked += ", ";
        }
        if (props.question.questionId.options[x]._id === correctId) {
          correct += props.question.questionId.options[x].option.text;
          correct += ", ";
        }
      }
    }
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
            marked answer : {marked}
          </Grid>
          <Grid item xs={12} sm={6}>
            correct answer : {correct}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (props.question.questionType === "longAnswer") {
    ans = (
      <Grid container>
        <Grid container item>
          <Grid item xs={12}>
            {props.question.answers}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (props.question.questionType === "shortAnswer") {
    ans = (
      <Grid container>
        <Grid container item>
          <Grid item xs={12}>
            {props.question.answers}
          </Grid>
        </Grid>
      </Grid>
    );
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
