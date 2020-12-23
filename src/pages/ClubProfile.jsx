import {
    Avatar,
    Button,
    Container,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography,
    AppBar,
    Toolbar
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { black } from "color-name";
import "./ClubProfile.css";
import "../components/Shared/Navbar/Navbar.css";

const useStyles = makeStyles( ( theme ) => ( {
    avatar: {
        width: "150px",
        height: "150px",
        marginTop: "-20px",
        border: "2px solid #e31e43"
    },
    contPaper: {
        width: "100%",
        borderRadius: "20px",
        paddingBottom: "40px"
    },
    website: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    root: {
        "&.MuiInputBase-input.Mui-disabled": {
            color: "#000000"
        }
    }
} ) );

const OrgProfile = ( props ) => {
    const classes = useStyles();

    const [data, setData] = useState( null );
    const [loading, setLoading] = useState( true );
    const [error, setError] = useState( false );

    const username = props.match.params.username;

    const fetchProfile = async () => {
        const url = `${
            process.env.REACT_APP_BACKEND_URL
        }/club/details/username?username=${ username }`;

        try {
            await Axios.get( url ).then( ( res ) => {
                setData( res.data.club );

                if ( res.data.club === null ) {
                    setError( true );
                }
            } );
        } catch ( error ) {
            setError( true );
        }

        setLoading( false );
    };

    useEffect( () => {
        fetchProfile();
    }, [] );

    if ( loading ) {
        return <Loading/>;
    } else if ( error ) {
        return <ErrorPage/>;
    }

    return (
        <div style={
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }
            className="org-profile-container profile-section-container">
            <div className={
                classes.contPaper
            }>
                <AppBar className="navbar"
                    style={
                        {
                            backgroundColor: "#fdf9f9",
                            zIndex: "1400",
                            position: "relative"
                        }
                    }
                    elevation={2}>
                    <Toolbar>
                        <Link to={`/student/dashboard`}>
                            <img src="/assets/Group2.png" alt="logo" className="nav-img"/>
                        </Link>
                        <Typography variant="h5" className="nav-brand"
                            style={
                                { flex: 1 }
                        }>
                            Dashboard
                        </Typography>
                        <Button className="logout-btn-nav" href="/">
                            LogOut
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container>
                        <img src={
                                data.clubBanner ? data.clubBanner : "/assets/bannerIMG.jpg"
                            }
                            width="100%"
                            alt=""
                            className="profile-banner"></img>
                    </Grid>
                </Container>
                <Container>
                    <Grid container
                        spacing={7}>
                        <Grid container direction="row" justify="flex-end" alignItems="center"
                            style={
                                { marginRight: "80px" }
                        }>
                            <Avatar alt="Club Logo"
                                src={
                                    data.clubAvatar ? data.clubAvatar : "/assets/avatar.jpeg"
                                }
                                className={
                                    classes.avatar
                                }/>
                        </Grid>
                        <Grid item container
                            xs={12}
                            style={
                                { marginTop: '30px' }
                        }>
                            <form style={
                                { width: "100%" }
                            }>
                                <Grid container
                                    spacing={3}
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center">
                                    <Grid item
                                        xs={6}>
                                        <Typography style={
                                            {
                                                color: "#000000",
                                                fontSize: "20px",
                                                fontWeight: "bolder"
                                            }
                                        }>
                                            <span style={
                                                {
                                                    color: "#E31E43",
                                                    fontSize: "20px"
                                                }
                                            }>Name:&nbsp;&nbsp;
                                            </span>
                                            {
                                            data.name
                                        }
                                            {" "} </Typography>
                                    </Grid>
                                    <Grid item
                                        xs={6}>
                                        <Typography style={
                                            {
                                                color: "#000000",
                                                fontSize: "20px",
                                                fontWeight: "bolder"
                                            }
                                        }>
                                            <span style={
                                                {
                                                    color: "#E31E43",
                                                    fontSize: "20px"
                                                }
                                            }>Type:&nbsp;&nbsp;
                                            </span>
                                            {
                                            data.type
                                        }
                                            {" "} </Typography>
                                    </Grid>
                                    <Grid item
                                        xs={12}>
                                        <Typography style={
                                            {
                                                color: "#E31E43",
                                                fontSize: "20px",
                                                fontWeight: "bolder"
                                            }
                                        }>
                                            Description:
                                        </Typography>
                                        <div name="bio" label="Description" variant="outlined"
                                            style={
                                                {
                                                    color: "#040404",
                                                    marginTop: "10px",
                                                    whiteSpace: "pre-wrap"
                                                }
                                        }>
                                            {
                                            data.bio
                                        }
                                            {" "} </div>
                                    </Grid>
                                    <Grid item
                                        xs={12}>
                                        <a href={
                                                data.website
                                            }
                                            className="org-website-link"
                                            rel="noreferrer"
                                            target="_blank">
                                            <Typography style={
                                                {
                                                    color: "#000000",
                                                    fontSize: "20px",
                                                    marginTop: "10px"
                                                }
                                            }>
                                                <span style={
                                                    {
                                                        color: "#E31E43",
                                                        fontSize: "20px",
                                                        fontWeight: "bolder"
                                                    }
                                                }>Organisation Link:&nbsp;&nbsp;
                                                </span>
                                                <span style={
                                                    { textDecoration: "underline" }
                                                }>
                                                    {
                                                    data.website
                                                }</span>
                                                {" "} </Typography>
                                        </a>
                                    </Grid>
                                    <Grid item
                                        xs={12}>
                                        <Typography style={
                                            {
                                                color: "#000000",
                                                fontSize: "20px",
                                                fontWeight: "bolder"
                                            }
                                        }>
                                            <span style={
                                                {
                                                    color: "#E31E43",
                                                    fontSize: "20px"
                                                }
                                            }>Contact Number:&nbsp;&nbsp;
                                            </span>
                                            {
                                            data.mobileNumber
                                        }
                                            {" "} </Typography>
                                    </Grid>
                                    <Grid item
                                        xs={12}
                                        style={
                                            {
                                                marginTop: "5%",
                                                textAlign: "center"
                                            }
                                    }>
                                        <a href={
                                                data.typeOfPartner === "Micro" || data.typeOfPartner === "Nano" ? data.redirectURL : `/student/club/${
                                                    data._id
                                                }`
                                            }
                                            rel="noreferrer"
                                            target="_blank">
                                            <Button variant="contained" color="primary"
                                                style={
                                                    {
                                                        paddingTop: "15px",
                                                        paddingBottom: "15px",
                                                        textTransform: "capitalize",
                                                        border: "1px solid #E31E43",
                                                        backgroundColor: "#E31E43",
                                                        color: "white",
                                                        fontFamily: "Source Sans Pro",
                                                        borderRadius: "6px",
                                                        fontSize: "18px",
                                                        fontWeight: "600",
                                                        lineHeight: "150%",
                                                        outline: "none",
                                                        marginBottom: "40px",
                                                        width: "181px"
                                                    }
                                            }>
                                                Apply Now
                                            </Button>
                                        </a>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
                <Grid style={
                    {
                        backgroundColor: "#FCF9F9",
                        color: "#2C2D2D",
                        padding: "25px",
                        marginTop: "40px"
                    }
                }>
                    <center>
                        <a href="https://www.codechefvit.com" target="_blank" rel="noreferrer">
                            <img src="/assets/blacklogo.png" alt="CodeChef-VIT" width="150px" align="center"/>
                        </a>
                    </center>
                    <p style={
                        { textAlign: "center" }
                    }>
                        Imagined, Designed and Developed by&nbsp;
                        <a href="https://www.codechefvit.com"
                            style={
                                { color: "#E31E43" }
                            }
                            target="_blank"
                            rel="noreferrer">
                            CodeChef-VIT
                        </a>
                    </p>
                </Grid>
            </div>
        </div>
    );
};

export default OrgProfile;
