import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import {
  Paper,
  Button,
  Grid,
  Container,
  Typography,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const ClubCarousel = (props) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} style={{ marginBottom: "20px" }}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src={props.club.clubAvatar}
              aria-label='recipe'
              className={classes.avatar}
            />
          }
          title={props.club.name}
        />
        <CardMedia
          className={classes.media}
          image={props.club.clubBanner}
          title={props.club.name}
        />
        <CardContent style={{ height: "65px" }}>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className='card-text-stud-dash'>
            {props.club.bio}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {props.club.username === "codechefvit" ?
            <Link to={"/us/" + props.club.username} style={{ flex: "1" }}>
              <IconButton aria-label='share' style={{ fontSize: "15px" }}>
                Know More
              <DoubleArrowIcon />
              </IconButton>
            </Link>
            :
            <Link to={"/org/" + props.club.username} style={{ flex: "1" }}>
              <IconButton aria-label='share' style={{ fontSize: "15px" }}>
                Know More
              <DoubleArrowIcon />
              </IconButton>
            </Link>
          }
          <Typography align="right" style={{ fontSize: "12px" }}>
            {
              props.club.numOfTestsPublished > 0
                ? <EventAvailableIcon fontSize="small" style={{ marginTop: "7px", flex: "1", paddingRight: "7px" }} />
                : "No Active Tests"
            }
          </Typography>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ClubCarousel;
