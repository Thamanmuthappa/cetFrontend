import React from "react";
import { Grid, Container, Typography } from "@material-ui/core";

const TestQuestion = (props) => {
  let ans = null;

  if (props.question.questionType === "singleCorrect") {
    let markedId = props.question.answers[0];
    let marked = null;
    let correct = null;
    for (let x in props.question.questionId.options) {
      if (props.question.questionId.options[x]._id === markedId) {
        marked = props.question.questionId.options[x].option.text;
      }
      if (props.question.questionId.options[x].option.isCorrect) {
        correct = props.question.questionId.options[x].option.text;
      }
    }

    ans = (
      <Grid container style={{ marginTop: "20px", marginBottom: "30px" }}>
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
        <Grid container item style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6}>
            <b>Marked Answer :</b> {marked}
          </Grid>
          <Grid item xs={12} sm={6}>
            <b>Correct Answer :</b> {correct}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (props.question.questionType === "multipleCorrect") {
    let markedId;
    let marked = "";
    let correct = "";

    for (let y in props.question.answers) {
      markedId = props.question.answers[y];

      for (let x in props.question.questionId.options) {
        if (props.question.questionId.options[x]._id === markedId) {
          marked += props.question.questionId.options[x].option.text;
          marked += ", ";
        }
      }
    }
    for (let x in props.question.questionId.options) {
      if (props.question.questionId.options[x].option.isCorrect) {
        correct += props.question.questionId.options[x].option.text;
        correct += ", ";
        console.log(correct);
      }
    }
    ans = (
      <Grid container style={{ marginTop: "20px", marginBottom: "30px" }}>
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
        <Grid container item style={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6}>
            <b>Marked Answer(s) :</b> {marked}
          </Grid>
          <Grid item xs={12} sm={6}>
            <b>Correct Answer(s) :</b> {correct}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (props.question.questionType === "longAnswer") {
    ans = (
      <Grid container style={{ marginTop: "20px", marginBottom: "30px" }}>
        <Grid container item>
          <Grid item xs={12}>
            {props.question.answers}
          </Grid>
        </Grid>
      </Grid>
    );
  } else if (props.question.questionType === "shortAnswer") {
    ans = (
      <Grid container style={{ marginTop: "20px", marginBottom: "30px" }}>
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
        <Typography variant="h6" style={{ fontWeight: "bolder" }}>{"Q. " + props.question.questionId.description}</Typography>
      </Grid>
      {ans}
    </Container>
  );
};

export default TestQuestion;
