import React, { useState, useEffect, useContext } from "react";
import NavbarStud from "../../../hoc/NavbarStud/NavbarStud";

import {
  Paper,
  Container,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { StudentContext } from "../../../context/StudentContext";
import { patchStudProfile } from "../../../API/PATCH";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: "150px",
    height: "150px",
  },
  contPaper: {
    width: "80%",
    borderRadius: "20px",
    marginTop: "10px",
    paddingBottom: "40px",
  },
  input: {
    width: "100%",
  },
}));

const StudProfile = () => {
  const { studentProfile } = useContext(StudentContext);

  const classes = useStyles();
  console.log(StudentContext);
  console.log("cssd");

  // console.log(studentProfile);

  const [error, setError] = useState(null);
  const [studData, setStudData] = useState(studentProfile.student);
  console.log(studData);
  const [disabled, setDisabled] = useState(true);

  const handleProfileChange = (e) => {
    setStudData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const updateProfile = async () => {
    setDisabled(true);
    const token = localStorage.getItem("studentAuthToken");

    const res = await patchStudProfile(studData, token);

    // if (res) {
    //   getProfile(token);
    // setProfileSuccess(true);
    // }

    setDisabled(false);
  };

  useEffect(() => {
    if (JSON.stringify(studData) === JSON.stringify(studentProfile.club)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [studData, studentProfile]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (studData) {
    return (
      <NavbarStud>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className='profile-section-container'>
          <Paper elevation={3} className={classes.contPaper}>
            <Container>
              <Grid container spacing={7}>
                <Grid container style={{ marginTop: "40px" }} justify='center'>
                  <Typography
                    gutterBottom
                    variant='h4'
                    style={{
                      fontFamily: "Source Sans Pro",
                      fontWeight: "600",
                    }}>
                    Profile Page
                  </Typography>
                </Grid>
                <Grid item container xs={12}>
                  <form style={{ width: "100%" }}>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          name='name'
                          className={classes.input}
                          label='Name'
                          variant='outlined'
                          value={studData.name}
                          onChange={handleProfileChange}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          name='branch'
                          className={classes.input}
                          label='Branch'
                          variant='outlined'
                          value={studData.mobileNumber}
                          onChange={handleProfileChange}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          name='mobileNumber'
                          className={classes.input}
                          label='Contact Number'
                          variant='outlined'
                          value={studData.mobileNumber}
                          onChange={handleProfileChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name='social'
                          className={classes.input}
                          label='GitHub/LinkedIn/Resume'
                          variant='outlined'
                          value={studData.website}
                          onChange={handleProfileChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name='bio'
                          className={classes.input}
                          label='Bio'
                          multiline
                          rows={8}
                          variant='outlined'
                          value={studData.bio}
                          onChange={handleProfileChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant='contained'
                          color='primary'
                          // onClick={updateProfile}
                          disabled={disabled}>
                          Save Changes
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Container>
          </Paper>

          {/* <Snackbar
          autoHideDuration={4000}
          onClose={() => setProfileSuccess(false)}
          open={profileSuccess}>
          <Alert
            severity='success'
            variant='filled'
            onClose={() => setProfileSuccess(false)}>
            Your profile was successfully updated!
          </Alert>
        </Snackbar> */}
        </Container>
      </NavbarStud>
    );
  } else {
    return <div></div>;
  }
};

export default StudProfile;
