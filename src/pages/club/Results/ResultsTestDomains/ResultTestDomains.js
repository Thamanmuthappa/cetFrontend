import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import {
  fetchSubmissionsForDomain,
  fetchSingleDomainDetails,
} from "../../../../API/GET";
import QuestionAddModal from "../../../../components/Club/QuestionAddModal";
import Navbar from "../../../../components/Shared/Navbar/Navbar";
import "../../DomainDetails/DomainDetails.css";
import "../../../../components/Club/QuestionsDisplay/QuestionsDisplay.css";
import Loading from "../../../Loading";
import StudentTestDetails from "../../../../components/Club/StudentTestQuestions/StudentTestQuestions";

const DomainDetails = (props) => {
  const testId = props.match.params.id;
  const domainId = props.match.params.domainId;

  const [domainDetails, setDomainDetails] = useState(
    props.location.state ?.domain,
  );
  const [loading, setLoading] = useState(true);
  const [questionAdd, setQuestionAdd] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuesLoading] = useState(true);

  const getQuestions = async () => {
    setQuesLoading(true);
    const token = localStorage.getItem("clubAuthToken");
    const questions = await fetchSubmissionsForDomain(domainId, token);

    // console.log(questions);

    setQuestions(questions);
    setQuesLoading(false);
  };

  const getDomainDetails = async () => {
    const token = localStorage.getItem("clubAuthToken");
    const details = await fetchSingleDomainDetails(domainId, token);

    setDomainDetails(details);
    setLoading(false);
  };

  const handleModalClose = () => {
    getQuestions();
    setQuestionAdd(false);
  };

  useEffect(() => {
    if (!domainDetails) {
      getDomainDetails();
    } else {
      setLoading(false);
    }

    getQuestions();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <div className='domain-details-page'>
        <Navbar location='Domain Name' />
        <Container className='test-details-container'>
          <div className='test-info'>
            <h1>
              <u>Domain Details</u>
            </h1>
            <div style={{ color: "#666666" }}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <p>
                    <strong>Domain Name:</strong> {domainDetails.domainName}
                  </p>

                  <p>
                    <strong>Domain Duration:</strong>{" "}
                    {domainDetails.domainDuration} minutes
                  </p>
                  <p>
                    <Tooltip
                      title='Marks are automatically added based on questions'
                      arrow>
                      <span>
                        <strong>Domain Marks:</strong>{" "}
                        {domainDetails.domainMarks}
                      </span>
                    </Tooltip>
                  </p>
                </Grid>
                <Grid item xs={6} sm={7}>
                  <p>
                    <strong>Domain Description:</strong>{" "}
                    {domainDetails.domainDescription}
                  </p>
                </Grid>
              </Grid>
            </div>
          </div>
          <Divider />
          <div className='test-page-domain'>
            <h1>
              <u>Students</u>
            </h1>

            <div className='domain-page-question-list'>
              {questionsLoading ? (
                <div className='questions-loading'>
                  <CircularProgress color='primary' />
                  Getting students...
                </div>
              ) : questions.length === 0 ? (
                <div className='test-page-no-domains'>
                  <Typography variant='h2' className='light-text'>
                    No Students Attempted
                  </Typography>
                </div>
              ) : (
                    <div className='domain-questions' style={{ whiteSpace: "pre-wrap" }}>
                      {questions.map((question, i) => (
                        <Accordion key={i} elevation={4}>
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls='question-content'>
                            {question.studentId.name}
                          </AccordionSummary>
                          <AccordionDetails>
                            <Divider />
                            <StudentTestDetails details={question.responses} />
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </div>
                  )}
            </div>
          </div>
        </Container>
      </div>
      <QuestionAddModal
        open={questionAdd}
        handleClose={handleModalClose}
        testId={testId}
        domainId={domainId}
      />
    </>
  );
};

export default DomainDetails;
