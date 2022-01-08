import {
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTestDetails, fetchTestDomains } from "../../../../API/GET";
import DomainAddModal from "../../../../components/Club/DomainAddModal";
import ClubDomainTile from "../../../../components/Club/DomainTile/ClubDomainTile";
import Navbar from "../../../../components/Shared/Navbar/Navbar";
import Loading from "../../../Loading";
import "../../TestDetails/TestDetails";

const TestDetails = (props) => {
  const id = props.match.params.id;
  const [loading, setLoading] = useState(true);

  const [testDetails, setTestDetails] = useState({});
  const [testDomains, setTestDomains] = useState([]);

  const [addDomainOpen, setAddDomain] = useState(false);

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
            <a>Test Details</a>
          </h1>
          <div style={{ color: "#fff" }}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={3}>
                <p>
                  <strong>Round Number:</strong> {testDetails.roundNumber}
                </p>
                <p>
                  <strong>Round Type:</strong> {testDetails.roundType}
                </p>
                <p>
                  <strong>Total Duration:</strong> {testDetails.duration}
                </p>
              </Grid>
              <Grid item xs={6} sm={3}>
                <p>
                  <strong>Start Time:</strong>{" "}
                  {new Date(testDetails.scheduledForDate).toLocaleString()}
                </p>
                <p>
                  <strong>End Time:</strong>{" "}
                  {new Date(testDetails.scheduledEndDate).toLocaleString()}
                </p>
              </Grid>
            </Grid>
          </div>
        </div>
        <Divider style={{background:"#F5F5F540"}}/>
        <div className='test-page-domain'>
          <h1>
            <a>Test Domains</a>
          </h1>

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
                    {testDomains.map((domain) => (
                      <Grid item xs={12} sm={3}>
                        <Link
                          to={{
                            pathname: `/club/results/test/${id}/${domain._id}`,
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
    </div>
  );
};

export default TestDetails;
