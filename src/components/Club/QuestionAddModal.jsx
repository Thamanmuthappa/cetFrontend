import {
  AppBar,
  Button,
  Dialog,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Slide,
  Snackbar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import CreateSingleCorrect from "./QuestionForms/CreateSingleCorrect";
import CreateShortQuestion from "./QuestionForms/CreateShortQuestion";
import CreateLongQuestion from "./QuestionForms/CreateLongQuestion";
import CreateMultipleCorrect from "./QuestionForms/CreateMultipleCorrect";

const useStyle = makeStyles((theme) => ({
  drawer: {
    width: 200,
    color: "white",
    background: "#081220",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const questionTypes = [
  {
    id: 1,
    type: "singleCorrect",
    name: "Single Correct",
  },
  {
    id: 2,
    type: "multipleCorrect",
    name: "Multiple Correct",
  },
  {
    id: 3,
    type: "shortAnswer",
    name: "Short Answer",
  },
  {
    id: 4,
    type: "longAnswer",
    name: "Long Answer",
  },
];

const QuestionAddModal = ({
  open,
  handleClose,
  testId,
  domainId,
  addMarks,
}) => {
  const classes = useStyle();

  const [selectedType, setSelectedType] = useState(1);
  const [adding, setAdding] = useState(false);

  const [questionSnack, setQuestionSnack] = useState(false);

  const snackOps = {
    setQuestionSnack,
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullScreen
      style={{ zIndex: 1500, background: "#081220" }}
      TransitionComponent={Transition}>
      <AppBar style={{ zIndex: 1401 }}>
        <Toolbar>
          <IconButton onClick={handleClose}>
            <Close style={{ fill: "white" }} />
          </IconButton>
          <Typography variant='h6' style={{ flex: 1 , color: "white"}}>
            Add a Question
          </Typography>
          <Button
            color='inherit'
            className='dialog-top-btn'
            type='submit'
            form={`create-question-${selectedType}`}
            disabled={adding}>
            Create
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' classes={{ paper: classes.drawer }}>
        <Toolbar />
        <List>
          {questionTypes.map((type) => (
            <div key={type.id}>
              <ListItem
                button
                className='add-question-drawer-item'
                onClick={() => setSelectedType(type.id)}>
                <ListItemText primary={type.name} />
              </ListItem>
              <Divider style={{background:"#F5F5F540"}}/>
            </div>
          ))}
        </List>
      </Drawer>
      <div className='create-question-area' style={{background: "#081220"}}>
        <Typography variant='h4' style={{color: "#fff"}}>Enter Question details</Typography>
        <Divider style={{background:"#F5F5F540", marginTop: "1%", marginRight:"15%"}}/>
        <div className='create-question-display'>
          {selectedType === 1 ? (
            <CreateSingleCorrect
              testId={testId}
              domainId={domainId}
              setLoading={setAdding}
              addMarks={addMarks}
              snackOps={snackOps}
            />
          ) : null}
          {selectedType === 2 ? (
            <CreateMultipleCorrect
              testId={testId}
              domainId={domainId}
              setLoading={setAdding}
              addMarks={addMarks}
              snackOps={snackOps}
            />
          ) : null}
          {selectedType === 3 ? (
            <CreateShortQuestion
              testId={testId}
              domainId={domainId}
              setLoading={setAdding}
              addMarks={addMarks}
              snackOps={snackOps}
            />
          ) : null}
          {selectedType === 4 ? (
            <CreateLongQuestion
              testId={testId}
              domainId={domainId}
              setLoading={setAdding}
              addMarks={addMarks}
              snackOps={snackOps}
            />
          ) : null}
        </div>
      </div>
      <Snackbar
        open={questionSnack}
        autoHideDuration={5000}
        onClose={() => setQuestionSnack(false)}>
        <Alert variant='filled' severity='success'>
          Question added successfully!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default QuestionAddModal;
