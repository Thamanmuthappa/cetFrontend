import {
	Accordion,
	AccordionDetails,
	AccordionSummary, Button, CircularProgress,
	Container,
	Divider,
	Grid,
	IconButton,
	Snackbar,
	// Button,
	TextField, Tooltip,
	Typography
} from "@material-ui/core";
import { Check, ExpandMore, GetApp } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import { Alert, Pagination } from "@material-ui/lab";
import jsonexport from "jsonexport";
import React, { useEffect, useState } from "react";
import {
	fetchSingleDomainDetails, fetchSubmissionsForDomain
} from "../../../../API/GET";
import "../../../../components/Club/QuestionsDisplay/QuestionsDisplay.css";
import ShortlistModal from "../../../../components/Club/ShortlistModal/ShortlistModal";
import StudentTestQuestions from "../../../../components/Club/StudentTestQuestions/StudentTestQuestions";
import Navbar from "../../../../components/Shared/Navbar/Navbar";
import Loading from "../../../Loading";
import "../../DomainDetails/DomainDetails.css";
import "./ResultTestDomain.css";
import { useHistory } from "react-router-dom";

const DomainDetails = (props) => {
  const testId = props.match.params.id;
  const domainId = props.match.params.domainId;
  const history = useHistory();

  const [domainDetails, setDomainDetails] = useState(
    props.location.state?.domain
  );
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [questionsLoading, setQuesLoading] = useState(true);

  const [shortlisted, setShortlisted] = useState([]);
  const [shortlistModal, setShortlistModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [successShortlist, setSuccessShortlist] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // let qp = [];

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleResponseExport = () => {
    const data = JSON.parse(JSON.stringify(questions));

    data.map((response) => {
      delete response._id;
      delete response.studentId._id;

      response.responses.map((curr) => {
        delete curr._id;
        delete curr.questionId._id;
        delete curr.corrected;
      });
    });

    jsonexport(data, (err, csv) => {
      if (err) return console.log(err);

      let csvContent = "data:text/csv;charset=utf-8," + csv;

      const url = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${domainDetails.domainName}.csv`);
      document.body.appendChild(link);

      link.click();
    });
  };
  const handleShortlistExport = () => {
    jsonexport(shortlisted, (err, csv) => {
      if (err) return console.log(err);

      let csvContent = "data:text/csv;charset=utf-8," + csv;

      const url = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${domainDetails.domainName}.csv`);
      document.body.appendChild(link);

      link.click();
    });
  };

  const getQuestions = async () => {
    setQuesLoading(true);
    const token = localStorage.getItem("clubAuthToken");
    const { final, shortlisted } = await fetchSubmissionsForDomain(
      domainId,
      token
    );
    console.log(final);
    setQuestions(final);
    setShortlisted(shortlisted);
    setQuesLoading(false);
  };

  const getDomainDetails = async () => {
    const token = localStorage.getItem("clubAuthToken");
    const details = await fetchSingleDomainDetails(domainId, token);

    setDomainDetails(details);
    setLoading(false);
  };

  const handleShortlistClick = (e, student) => {
    e.stopPropagation();

    setSelectedStudent(student);
    setShortlistModal(true);
  };

  const isShortlisted = (id) => {
    const f = shortlisted.find((x) => x.studentId._id === id);

    if (f) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (!domainDetails) {
      getDomainDetails();
    } else {
      setLoading(false);
    }

    getQuestions();
  }, []);

  const questSearch = () =>
    questions.filter((question) => {
      // console.log(searchTerm.toLowerCase());
      if (searchTerm === "") {
        // console.log(question.studentId.name.toLowerCase());

        return question;
      } else if (
        question.studentId.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return question;
      }
    });

  if (loading) {
    return <Loading />;
  }
//   console.log(questions);
  const handleBack = () => {
	history.goBack();
	  };
  return (
    <>
      <div className="domain-details-page">
        <Navbar location="Domain Name" />
        <Container className="test-details-container">
          <div className="test-info">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>
                <a>Domain Details</a>
              </h1>
              <IconButton aria-label="goback" onClick={handleBack}>
                <CloseIcon htmlColor="#FF2211" />
              </IconButton>
            </div>
            <div style={{ color: "#fff" }}>
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                  <p>
                    <strong>Domain Name:</strong> {domainDetails.domainName}
                  </p>

                  <p>
                    <strong>Domain Duration:</strong>{" "}
                    {domainDetails.domainDuration} minutes
                  </p>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <p>
                    <strong>Domain Description:</strong>{" "}
                    {domainDetails.domainDescription}
                  </p>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={4}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    variant="contained"
                    className="csv-download-btn responses-btn"
                    onClick={handleResponseExport}
                    disabled={questionsLoading}
                    style={{ marginBottom: "20px" }}
                  >
                    <GetApp />
                    Export responses to CSV
                  </Button>
                  <Button
                    variant="contained"
                    className="csv-download-btn"
                    onClick={handleShortlistExport}
                    disabled={questionsLoading}
                  >
                    <GetApp />
                    Export shortlisted to CSV
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          <Divider style={{ background: "#F5F5F540" }} />
          <div
            style={{ paddingBottom: "0px", marginTop: "20px" }}
            className="test-page-domain"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h1>
                  <a>Students</a>
                </h1>
              </div>
              <div>
                <TextField
                  style={{ marginTop: "4px" }}
                  label="Search"
                  variant="outlined"
                  size="small"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="domain-page-question-list">
              {questionsLoading ? (
                <div className="questions-loading">
                  <CircularProgress color="primary" />
                  Getting students...
                </div>
              ) : questions.length === 0 ? (
                <div className="test-page-no-domains">
                  <Typography variant="h2" className="light-text">
                    No Students Attempted
                  </Typography>
                </div>
              ) : (
                <div
                  className="domain-questions"
                  style={{ whiteSpace: "pre-wrap" }}
                >
                  {questSearch()
                    .slice(page * 10 - 10, page * 10)
                    .map((question, i) => (
                      <Accordion
                        key={i}
                        elevation={4}
                        style={{
                          color: "#fff",
                          background:
                            "linear-gradient(45deg, rgba(255, 255, 255, 0.078) 4.21%, rgba(255, 255, 255, 0) 100%)",
                          marginBottom: "0.5%",
                        }}
                      >
                        {/* {console.log(question)} */}
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
                          aria-controls="question-content"
                          className="submission-summary"
                        >
                          <Tooltip
                            title={`Shortlist this student ${
                              isShortlisted(question.studentId._id)
                                ? "(Already shortlisted)"
                                : null
                            }`}
                          >
                            <IconButton
                              onClick={(e) => handleShortlistClick(e, question)}
                            >
                              <Check
                                style={{
                                  fill: isShortlisted(question.studentId._id)
                                    ? "green"
                                    : "red",
                                }}
                              />
                            </IconButton>
                          </Tooltip>
                          <a style={{ display: "flex", alignItems: "center" }}>
                            {question.studentId.name}
                          </a>
                        </AccordionSummary>
                        <AccordionDetails style={{ padding: "10px" }}>
                          <Divider style={{ background: "#F5F5F540" }} />
                          <StudentTestQuestions details={question.responses} />
                        </AccordionDetails>
                      </Accordion>
                    ))}
                </div>
              )}
            </div>
          </div>
          <Pagination
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
            count={Math.ceil(questSearch().length / 10)}
            page={page}
            onChange={handleChange}
          />
        </Container>
      </div>

      <ShortlistModal
        open={shortlistModal}
        onClose={() => setShortlistModal(false)}
        selected={selectedStudent}
        setSelected={setSelectedStudent}
        domainId={domainId}
        setSuccess={() => setSuccessShortlist(true)}
        refresh={getQuestions}
      />
      <Snackbar
        open={successShortlist}
        autoHideDuration={4000}
        onClose={() => setSuccessShortlist(false)}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setSuccessShortlist(false)}
        >
          Successfully shortlisted student
        </Alert>
      </Snackbar>
    </>
  );
};

export default DomainDetails;
