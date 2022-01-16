import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useHistory } from "react-router-dom";
import CountDownModal from "../../../components/CountDownModal/CountDownModal";
import StudentNavbar from "../../../components/Student/StudentNavbar/StudentNavbar";
import TestQuestionDisplay from "../../../components/Student/TestQuestionDisplay/TestQuestionDisplay";
import Loading from "../../Loading";
import { dummyTest } from "./dummyTest";
import "./TestScreen.css";
import Fab from "@material-ui/core/Fab";
import Camera from "@material-ui/icons/CameraAlt";
import Webcam from "react-webcam";

import {
  fullScreenListeners,
  fullscreenWindow,
  removeFullScreenListeners,
} from "./utils";

const TestScreen = (props) => {
  const [testDetails, setTestDetails] = useState(dummyTest);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [openCam, setopenCam] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [startedAt, setStartedAt] = useState(Date.now() * 100000);
  const history = useHistory();
  const [countdownModal, setCountdownModal] = useState(false);
  const [violated, setViolated] = useState(false);

  const minsToMilli = (mins) => {
    return mins * 60 * 1000;
  };

  const sendRequest = async (final) => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/submit`;
    const token = localStorage.getItem("studentAuthToken");
    console.log("Sending request");

    await Axios.post(url, final, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLoading(false);
        setSubmitted(true);
        console.log("Submitting Test");
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  };

  const submitTest = () => {
    setLoading(true);
    console.log("Submit test Called");
    const final = JSON.parse(JSON.stringify(answers));
    final.timeTaken = (Date.now() - startedAt) / 1000;
    sendRequest(final);
  };

  const handleTimeout = () => {
    console.log("Time Out");
    submitTest();
  };

  const createAnsObject = (testDetails) => {
    const obj = {};
    obj.domainId = testDetails.domainDetails._id;
    obj.testId = testDetails.testDetails._id;
    obj.clubId = testDetails.clubDetails._id;
    obj.submissions = [];

    testDetails.questions.map((question) => {
      const curr = {
        questionId: question.questionId,
        questionType: question.questionType,
        answers: question.questionType === "multipleCorrect" ? [] : [""],
      };

      obj.submissions.push(curr);
    });

    return obj;
  };

  const handleTabChange = () => {
    setCountdownModal(true);
    // console.log(document.visibilityState);
  };

  const handleFullScreenExit = () => {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      handleTabChange();
    }
  };
  const handleModalClose = () => {
    setCountdownModal(false);
    fullscreenWindow();
  };

  const handleTestViolation = () => {
    setViolated(true);
    console.log("test violated");
    setCountdownModal(false);
    setConfirmSubmit(false);
  };

  const videoConstraints = {
    width: 300,
    height: 200,
    facingMode: "user",
  };
  const webcamRef = React.useRef(null);
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
  
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
      },
      [webcamRef]
    );
  };

  useEffect(() => {
    if (violated) submitTest();
  }, [violated]);

  useEffect(() => {
    try {
      const details = props.location.state.details;

      if (props.location.state.details) {
        setTestDetails(details);
        const ansObject = createAnsObject(details);
        setAnswers(ansObject);
        setStartedAt(props.location.state.startedAt);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }, [props.location.state.startedAt, props.location.state.details]);

  useEffect(() => {
    fullscreenWindow();
    fullScreenListeners(handleFullScreenExit);
    window.addEventListener("visibilitychange", handleTabChange);
    window.addEventListener("blur", handleTabChange);
    return () => {
      window.removeEventListener("visibilitychange", handleTabChange);
      window.removeEventListener("blur", handleTabChange);
      removeFullScreenListeners();
    };
  }, []);

  
  if (loading) {
    return <Loading />;
  } else if (error) {
    return "There was some error";
  }

  

  return (
    <div
      className="test-page"
      style={{ paddingBottom: "40px", background: "#081220" }}
    >
      <StudentNavbar location="Attempt test" />
      <div className="cont-colo">
        <Container
          className="test-container"
          style={{ paddingBottom: "40px", color: "#081220" }}
        >
          <div className="student-test-details">
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ textAlign: "center", color: "#fff" }}
              >
                <Typography
                  variant="h4"
                  className="light-text"
                  style={{ color: "#fff" }}
                >
                  Club Name: <strong>{testDetails.clubDetails.name}</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ textAlign: "center", color: "#fff" }}
              >
                <Typography
                  variant="h4"
                  className="light-text"
                  style={{ color: "#fff" }}
                >
                  Domain:{" "}
                  <strong> {testDetails.domainDetails.domainName} </strong>
                </Typography>
              </Grid>
              <Divider
                style={{
                  height: "1px",
                  width: "100%",
                  backgroundColor: "#f5f5f540",
                }}
              />
              <Grid item xs={12} className="test-timer-grid">
                <div className="test-time-remaining">
                  <Typography variant="h4" color="primary">
                    <strong>
                      <Countdown
                        daysInHours
                        date={
                          startedAt +
                          minsToMilli(testDetails.domainDetails.domainDuration)
                        }
                        onComplete={handleTimeout}
                      >
                        <span>Time Up!</span>
                      </Countdown>
                      {/* {timeRemaining} minutes remaining!{" "}
										TODO: MAKE DYNAMIC */}{" "}
                    </strong>
                  </Typography>
                </div>
              </Grid>
              <Divider style={{ width: "100%", background: "#f5f5f540" }} />
            </Grid>
          </div>
          <div className="student-questions-display">
            {testDetails.questions.map((question, i) => (
              <TestQuestionDisplay
                question={question}
                index={i}
                answers={answers}
                setAnswers={setAnswers}
                key={i}
              />
            ))}
          </div>
        </Container>
      </div>
      <div className="submit-test-button">
        <Tooltip title="Submit Test">
          <Button
            color="primary"
            variant="contained"
            className="submittestbutton"
            onClick={() => {
              setConfirmSubmit(true);
              console.log("Set Confirm Submit");
            }}
          >
            Submit Test
          </Button>
        </Tooltip>
      </div>
      <Dialog
        open={confirmSubmit}
        onClose={() => setConfirmSubmit(false)}
        fullWidth
      >
        <DialogTitle style={{ color: "white", background: "#252D3A" }}>
          Are you sure you want to submit this domain test?
        </DialogTitle>
        <DialogActions style={{ color: "white", background: "#252D3A" }}>
          <Button variant="contained" onClick={() => setConfirmSubmit(false)}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={submitTest}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={submitted}
        onClose={() => {
          history.replace({
            pathname: `/student/test/domains/${answers.testId}`,
            state: {
              details: props.location.state.testDetails,
            },
          });
        }}
        fullWidth
      >
        <DialogTitle style={{ color: "white", background: "#252D3A" }}>
          Test Submitted Successfully
        </DialogTitle>
        <DialogActions style={{ color: "white", background: "#252D3A" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.replace({
                pathname: `/student/test/domains/${answers.testId}`,
                state: {
                  details: props.location.state.testDetails,
                },
              });
            }}
          >
            Continue to another test
          </Button>
        </DialogActions>
      </Dialog>
      <CountDownModal
        open={countdownModal}
        onClose={handleModalClose}
        onComplete={handleTestViolation}
      />
      <Fab
        color="primary"
        aria-label="submit-test"
        className="submit-fab"
        onClick={() => setopenCam(true)}
      >
        <Camera />
      </Fab>
      <Dialog
        open={openCam}
        onClose={() => {
          setopenCam(false);
        }}
        fullWidth
      >
        <DialogTitle className style={{ color: "white", background: "#252D3A" }}>
          Live Camera Feed
        </DialogTitle>
        <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={600}
        videoConstraints={videoConstraints}
      />
        <DialogActions style={{ color: "white", background: "#252D3A" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setopenCam(false);
            }}
          >
            Close ✖
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TestScreen;
