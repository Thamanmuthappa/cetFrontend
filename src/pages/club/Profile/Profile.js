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
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { ClubContext } from "../../../context/ClubContext";
import { Alert } from "@material-ui/lab";
import { patchProfile } from "../../../API/PATCH";
import { AccountCircle, AspectRatio } from "@material-ui/icons";
import UpdateProfilePhoto from "../../../components/Club/ProfileModals/UpdateProfilePhoto";
// club avatar ,club banner ,socoial links, images
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

  const { clubDetails, setFeatured, getProfile } = useContext(ClubContext);

  const [error, setError] = useState(null);
  const [data, setData] = useState(clubDetails.club);

  const [disabled, setDisabled] = useState(true);

  const [featureLoading, setFeatureLoading] = useState(false);
  const [featureSuccess, setFeatureSuccess] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileFail, setProfileFail] = useState(false);

  const [dpModal, setDpModal] = useState(false);
  const [bannerModal, setBannerModal] = useState(false);
  const [askPassword, setAskPassword] = useState(false);

  const handleProfileChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFeaturedChange = async (e) => {
    setFeatureLoading(true);
    const curr = data.featured;

    const url = `${process.env.REACT_APP_BACKEND_URL}/club/feature`;
    const token = localStorage.getItem("clubAuthToken");

    const patch = {
      featured: !curr,
    };

    try {
      await axios
        .patch(url, patch, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFeatureSuccess(true);
          setFeatured(!curr);

          setData((prevState) => ({
            ...prevState,
            featured: !curr,
          }));
        });
    } catch (error) {}

    setFeatureLoading(false);
  };

  const updateProfile = async () => {
    setDisabled(true);
    const token = localStorage.getItem("clubAuthToken");

    const res = await patchProfile(data, token);

    if (res) {
      getProfile(token);
      setProfileSuccess(true);
      setAskPassword(false);
    } else {
      setProfileFail(true);
    }

    setDisabled(false);
  };

  const updateImages = () => {
    setData((prevState) => ({
      ...prevState,
      clubAvatar: clubDetails.club.clubAvatar,
      clubBanner: clubDetails.club.clubBanner,
    }));
  };

  useEffect(() => {
    if (JSON.stringify(data) === JSON.stringify(clubDetails.club)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [data, clubDetails]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (data) {
    return (
      <>
      <div className="contain-color">
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
            paddingBottom: "30px",
            color: "#081220",
            background: "#081220",
          }}
          className='profile-section-container'>
          <Paper elevation={3} className={classes.contPaper} style= {{color: "#081220"}}>
            <Grid container>
              <img
                width='100%'
                alt='banner img'
                src={
                  data.clubBanner ? data.clubBanner : "/assets/bannerIMG.jpg"
                }
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
                      data.clubAvatar ? data.clubAvatar : "/assets/avatar.jpeg"
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
                              the students on CET. (NOTE: TURN THIS ON ONLY
                              AFTER YOU HAVE FILLED AND SAVED THE PROFILE)
                            </span>
                          }
                          arrow>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={data.featured}
                                disabled={featureLoading}
                                onChange={handleFeaturedChange}
                              />
                            }
                            label='Feature your club'
                            labelPlacement='start'
                            style={{
                              marginBottom: "20px",
                            }}
                          />
                        </Tooltip>
                      </Grid>
                      <Grid item xs={6} style={{ textAlign: "right" }}>
                        <Tooltip title='Update profile photo'>
                          <IconButton onClick={() => setDpModal(true)}>
                            <AccountCircle />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Update banner'>
                          <IconButton onClick={() => setBannerModal(true)}>
                            <AspectRatio />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={6}>
                        <TextField
                          name='name'
                          className={classes.input}
                          label='Name'
                          variant='outlined'
                          value={data.name}
                          onChange={handleProfileChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name='type'
                          className={classes.input}
                          label='Type'
                          variant='outlined'
                          value={data.type}
                          onChange={handleProfileChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name='bio'
                          className={classes.input}
                          label='Description'
                          multiline
                          rows={8}
                          variant='outlined'
                          value={data.bio}
                          onChange={handleProfileChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name='website'
                          className={classes.input}
                          label='Organisation Link (URL)'
                          variant='outlined'
                          value={data.website}
                          onChange={handleProfileChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          name='mobileNumber'
                          className={classes.input}
                          label='Contact Number'
                          variant='outlined'
                          value={data.mobileNumber}
                          onChange={handleProfileChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => setAskPassword(true)}
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
          <UpdateProfilePhoto
            open={dpModal}
            onClose={() => setDpModal(false)}
            id={data._id}
            updateImages={updateImages}
          />
          <UpdateBannerPhoto
            open={bannerModal}
            onClose={() => setBannerModal(false)}
            id={data._id}
            updateImages={updateImages}
          />
          <Snackbar
            autoHideDuration={4000}
            onClose={() => setFeatureSuccess(false)}
            open={featureSuccess}>
            <Alert
              severity='success'
              variant='filled'
              onClose={() => setFeatureSuccess(false)}>
              Your profile was successfully made{" "}
              {data.featured ? "public" : "private"}!
            </Alert>
          </Snackbar>
          <Snackbar
            autoHideDuration={4000}
            onClose={() => setProfileSuccess(false)}
            open={profileSuccess}>
            <Alert
              severity='success'
              variant='filled'
              onClose={() => setProfileSuccess(false)}>
              Your profile was successfully updated!
            </Alert>
          </Snackbar>
          <Snackbar
            autoHideDuration={4000}
            onClose={() => setProfileFail(false)}
            open={profileFail}>
            <Alert
              severity='error'
              variant='filled'
              onClose={() => setProfileFail(false)}>
              Authentication Failed
            </Alert>
          </Snackbar>
        </Container>
        </div>
        <Dialog
          open={askPassword}
          onClose={() => setAskPassword(false)}
          fullWidth>
          <DialogTitle>Please Enter Password To Continue</DialogTitle>
          <TextField
            name='password'
            className={classes.input}
            label='Password'
            type='password'
            variant='outlined'
            value={data.password}
            onChange={handleProfileChange}
          />
          <DialogActions>
            <Button variant='contained' color='primary' onClick={updateProfile}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
};

export default ClubProfile;
