import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  Snackbar,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTestDetails, fetchTestDomains } from "../../../API/GET";
import DomainAddModal from "../../../components/Club/DomainAddModal";
import ClubDomainTile from "../../../components/Club/DomainTile/ClubDomainTile";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import Loading from "../../Loading";
import "./TestDetails.css";
import { Alert } from "@material-ui/lab";

const TestDetails = (props) => {
  const id = props.match.params.id;
  const [loading, setLoading] = useState(true);

  const [testDetails, setTestDetails] = useState({});
  const [testDomains, setTestDomains] = useState([]);

  const [addDomainOpen, setAddDomain] = useState(false);

  const [confirmPublish, setConfirmPublish] = useState(false);
  const [confirmBtnLoading, setConfirmBtnLoading] = useState(false);
  const [publishSnack, setPublishSnack] = useState(false);

  const handlePublish = async () => {
    setConfirmBtnLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/test/publish`;
    const token = localStorage.getItem("clubAuthToken");

    const data = {
      testId: id,
    };

    try {
      await Axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        setConfirmPublish(false);
        setPublishSnack(true);
      });
    } catch (error) {}

    setConfirmBtnLoading(false);
  };

  const getDetails = async () => {
    setLoading(true);
    const token = localStorage.getItem("clubAuthToken");
    const details = await fetchTestDetails(id, token);
    const domains = await fetchTestDomains(id, token);
    setTestDetails(details);
    setTestDomains(domains);
    setLoading(false);
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='test-details-page'>
      <Navbar location='Test Details' />
      <Container className='test-details-container'>
        <div className='test-info'>
          <h1>
            <u>Test Details</u>
          </h1>
          <div style={{ color: "#666666" }}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <p>
                  <strong>Round Number:</strong> {testDetails.roundNumber}
                </p>
                <p>
                  <strong>Round Type:</strong> {testDetails.roundType}
                </p>
              </Grid>
              <Grid item xs={5}>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(testDetails.scheduledForDate).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {new Date(testDetails.scheduledEndDate).toLocaleString()}
                </p>
              </Grid>
              <Grid
                item
                xs={3}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}>
                <Button
                  color='primary'
                  variant='contained'
                  disabled={testDetails.published}
                  onClick={() => setConfirmPublish(true)}>
                  Publish Test
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
        <Divider />
        <div className='test-page-domain'>
          <h1>
            <u>Test Domains</u>
          </h1>
          <div className='test-page-domain-top' style={{ textAlign: "right" }}>
            <Button
              variant='contained'
              className='custom-action-btn'
              color='primary'
              onClick={() => setAddDomain(true)}>
              <Add /> Add a new domain
            </Button>
          </div>
          <div className='test-page-domain-list'>
            {testDomains.length === 0 ? (
              <div className='test-page-no-domains'>
                <Typography variant='h2' className='light-text'>
                  No domains created
                </Typography>
              </div>
            ) : (
              <div className='test-page-domains-list'>
                <Grid container spacing={3}>
                  {testDomains.map((domain, i) => (
                    <Grid key={i} item xs={12} sm={3}>
                      <Link
                        to={{
                          pathname: `/club/test/${id}/${domain._id}`,
                          state: { domain },
                        }}>
                        <ClubDomainTile title={domain.domainName} />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </div>
        </div>
        {/* <Divider /> */}
      </Container>
      <DomainAddModal
        open={addDomainOpen}
        handleClose={() => setAddDomain(false)}
        id={id}
        refresh={getDetails}
      />
      <Dialog open={confirmPublish} onClose={() => setConfirmPublish(false)}>
        <DialogTitle>Are you sure you want to publish this test?</DialogTitle>
        <DialogActions>
          <Button variant='outlined'>Cancel</Button>
          <Button
            color='primary'
            variant='contained'
            onClick={handlePublish}
            disabled={confirmBtnLoading}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={publishSnack}
        autoHideDuration={5000}
        onClose={() => setPublishSnack(false)}>
        <Alert variant='filled' severity='success'>
          Test published!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TestDetails;
