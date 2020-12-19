import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Paper,
  Avatar,
  Container,
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Tooltip,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { StudentContext } from "../../../context/StudentContext";
import { Alert } from "@material-ui/lab";
import { patchProfile } from "../../../API/PATCH";
import { AccountCircle, AspectRatio } from "@material-ui/icons";
import UpdateProfilePhoto from "../../../components/Club/ProfileModals/UpdateProfilePhoto";
import UpdateBannerPhoto from "../../../components/Club/ProfileModals/UpdateBannerPhoto";

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

const ClubProfile = () => {
  const classes = useStyles();

  const { studentProfile } = useContext(StudentContext);
  console.log(studentProfile);

  const [error, setError] = useState(null);
  const [studData, setStudData] = useState(studentProfile.student);

  const [disabled, setDisabled] = useState(true);

  const [profileSuccess, setProfileSuccess] = useState(false);

  const [dpModal, setDpModal] = useState(false);
  const [bannerModal, setBannerModal] = useState(false);

  // const handleProfileChange = (e) => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const updateProfile = async () => {
  //   setDisabled(true);
  //   const token = localStorage.getItem("clubAuthToken");

  //   const res = await patchProfile(data, token);

  //   if (res) {
  //     getProfile(token);
  //     setProfileSuccess(true);
  //   }

  //   setDisabled(false);
  // };

  // const updateImages = () => {
  //   setData((prevState) => ({
  //     ...prevState,
  //     clubAvatar: clubDetails.club.clubAvatar,
  //     clubBanner: clubDetails.club.clubBanner,
  //   }));
  //   console.log(data, clubDetails.club);
  // };

  // useEffect(() => {
  //   if (JSON.stringify(data) === JSON.stringify(clubDetails.club)) {
  //     setDisabled(true);
  //   } else {
  //     setDisabled(false);
  //   }
  // }, [data, clubDetails]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (studData) {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className='profile-section-container'>
        <Paper elevation={3} className={classes.contPaper}>
          <Grid container>
            <img
              width='100%'
              alt='banner img'
              src={studData.clubBanner ? studData.clubBanner : "/assets/bannerIMG.jpg"}
              className='profile-banner'
              key={Date.now()}
            />
          </Grid>
          <Container>
            <Grid container spacing={7}>
              <Grid container justify='center'>
                <Avatar
                  alt='Club logo'
                  src={
                    studData.clubAvatar ? studData.clubAvatar : "/assets/avatar.jpeg"
                  }
                  className={classes.avatar}
                  key={Date.now()}
                />
              </Grid>
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
                      <Tooltip
                        title={
                          <span
                            style={{
                              fontSize: "1rem",
                            }}>
                            Turning this ON will make your profile public for
                            the students on CET.
                          </span>
                        }
                        arrow></Tooltip>
                    </Grid>
                    <Grid item xs={6} style={{ textAlign: "right" }}>
                      <Tooltip title='Update profile photo'>
                        {/* <IconButton onClick={() => setDpModal(true)}>
                          <AccountCircle />
                        </IconButton> */}
                      </Tooltip>
                      <Tooltip title='Update banner'>
                        {/* <IconButton onClick={() => setBannerModal(true)}>
                          <AspectRatio />
                        </IconButton> */}
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    {/* <Grid item xs={6}>
                      <TextField
                        name='name'
                        className={classes.input}
                        label='Name'
                        variant='outlined'
                        value={studData.name}
                        onChange={handleProfileChange}
                      />
                    </Grid> */}
                    {/* <Grid item xs={6}>
                      <TextField
                        name='type'
                        className={classes.input}
                        label='Type'
                        variant='outlined'
                        value={studData.type}
                        onChange={handleProfileChange}
                      />
                    </Grid> */}
                    <Grid item xs={12}>
                      {/* <TextField
                        name='bio'
                        className={classes.input}
                        label='Description'
                        multiline
                        rows={8}
                        variant='outlined'
                        value={studData.bio}
                        onChange={handleProfileChange}
                      /> */}
                    </Grid>
                    {/* <Grid item xs={6}>
                      <TextField
                        name='website'
                        className={classes.input}
                        label='Club Website Link'
                        variant='outlined'
                        value={studData.website}
                        onChange={handleProfileChange}
                      />
                    </Grid> */}
                    {/* <Grid item xs={6}>
                      <TextField
                        name='mobileNumber'
                        className={classes.input}
                        label='Club Contact Number'
                        variant='outlined'
                        value={studData.mobileNumber}
                        onChange={handleProfileChange}
                      />
                    </Grid> */}
                    {/* <Grid item xs={12}>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={updateProfile}
                        disabled={disabled}>
                        Save Changes
                      </Button>
                    </Grid> */}
                  </Grid>
                </form>
              </Grid>
            </Grid>
          </Container>
        </Paper>
        {/* <UpdateProfilePhoto
          open={dpModal}
          onClose={() => setDpModal(false)}
          id={studData._id}
          updateImages={updateImages}
        /> */}
        {/* <UpdateBannerPhoto
          open={bannerModal}
          onClose={() => setBannerModal(false)}
          id={studData._id}
          updateImages={updateImages}
        /> */}
        {/* <Snackbar
          autoHideDuration={4000}
          onClose={() => setFeatureSuccess(false)}
          open={featureSuccess}>
          <Alert
            severity='success'
            variant='filled'
            onClose={() => setFeatureSuccess(false)}>
            Your profile was successfully made{" "}
            {studData.featured ? "public" : "private"}!
          </Alert>
        </Snackbar> */}
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
    );
  }
  return <div></div>;
};

export default ClubProfile;
