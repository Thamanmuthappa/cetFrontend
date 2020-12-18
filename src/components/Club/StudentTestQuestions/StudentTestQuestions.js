import React from "react";
import {
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
import TestQuestion from "./TestQuestion/TestQuestion";

const StudentTestQuestions = (props) => {
  let questions = props.details.map((question, i) => (
    <TestQuestion key={i} question={question} />
  ));
  return (
    <div>
      {questions}
      <Divider />
    </div>
  );
};

export default StudentTestQuestions;
