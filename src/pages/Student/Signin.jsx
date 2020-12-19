import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Hidden,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./GoogleBtn.css";
import { StudentContext } from "../../context/StudentContext";

const useStyles = makeStyles( ( theme ) => ( {
    media: {
        height: 140
    },
    paper: {
        position: "absolute",
        width: "400",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #E45044",
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing( 2, 4, 3 ),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    root: {
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "4px 4px 50px rgba(0, 0, 0, 0.05)",
        borderRadius: "30px",
        textAlign: "center",
        height: "auto",
        width: "70%",
        margin: "0 auto"
    },
    gridList: {
        width: 800,
        height: 450
    },
    gridContainer: {
        height: "100%"
    },
    gridContainerBox: {
        width: "100%",
        margin: 0,
        padding: "2rem"
    },
    cardContent: {
        textAlign: "center",
        fontFamily: "Source Sans Pro",
        fontSize: "1rem"
    },
    gridItemContainer: {
        margin: "0 auto"
    }
} ) );

const StudentSignIn = () => {
    const classes = useStyles();

    const { isLoggedIn } = useContext( StudentContext );

    const [redirect, setRedirect] = useState( false );

    useEffect( () => {
        if ( isLoggedIn ) {
            setRedirect( true );
        }
    }, [ isLoggedIn ] );

    if ( redirect ) {
        return <Redirect to="/student/dashboard"/>;
    }

    return (
        <div className="bg-image"
            style={
                {
                    backgroundSize: "cover",
                    height: "100vh",
                    width: "100%",
                    backgroundPosition: "top"
                }
        }>
            <Link to="/">
                <img src="/assets/Group2.png" alt="logo"
                    style={
                        {
                            textAlign: "left",
                            width: "10rem",
                            height: "auto",
                            position: "absolute",
                            left: "7rem",
                            top: "3rem"
                        }
                    }/>
            </Link>
            <Grid container alignItems="center"
                className={
                    classes.gridContainer
                }
                spacing={0}>
                <Hidden mdDown>
                    <Grid item
                        xs={6}
                        style={
                            { textAlign: "center" }
                    }>
                        <img src="/assets/celebration.jpg" alt="celebration"
                            // width="70%"
                            height="auto"
                        />
                    </Grid>
                </Hidden>
                <Grid item container
                    sm={12}
                    md={6}>
                    <Card className={
                        classes.root
                    }>
                        <CardContent className={
                            classes.cardContent
                        }>
                            <Grid container
                                spacing={2}
                                className={
                                    classes.gridContainerBox
                            }>
                                <Grid item
                                    xs={12}>
                                    <Typography gutterBottom variant="h4" component="h2"
                                        style={
                                            {
                                                fontFamily: "Source Sans Pro",
                                                fontWeight: "600"
                                            }
                                    }>
                                        Welcome Back!
                                    </Typography>
                                </Grid>
                                <Grid item
                                    xs={12}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Sign in to your account
                                    </Typography>
                                </Grid>
                                <Grid item
                                    xs={12}
                                    className="btn-grid">
                                    <a className="google-link"
                                        href={
                                            `${
                                                process.env.REACT_APP_BACKEND_URL
                                            }/auth/google`
                                    }>
                                        <div className="google-btn">
                                            <div className="google-icon-wrapper">
                                                <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                                            </div>
                                            <p className="btn-text">
                                                <b>Sign in with Google</b>
                                            </p>
                                        </div>
                                    </a>
                                </Grid>
                                <div style={
                                    {
                                        textAlign: "center",
                                        width: "100%",
                                        marginTop: "20px"
                                    }
                                }>
                                    Made with &hearts; by CodeChef-VIT
                                </div>
                            </Grid>

                            <br/>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default StudentSignIn;
