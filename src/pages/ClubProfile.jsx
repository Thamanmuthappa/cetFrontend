import {
    Avatar,
    Button,
    Container,
    Grid,
    makeStyles,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import Loading from "./Loading";
import { black } from "color-name";
import './ClubProfile.css';

const useStyles = makeStyles( ( theme ) => ( {
    avatar: {
        width: "150px",
        height: "150px"
    },
    contPaper: {
        width: "100%",
        borderRadius: "20px",

        paddingBottom: "40px"
    },
    input: {
        width: "100%",
        border: "none"
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
                console.log( res );
                setData( res.data.club );

                if ( res.data.club === null ) {
                    setError( true );
                }
            } );
        } catch ( error ) {
            console.log( error );
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
            className="org-profile-container">
            <div className={
                classes.contPaper
            }>
                <Grid container>
                    <img src="/assets/bannerIMG.jpg" width="100%" alt="banner img"></img>
                </Grid>
                <Container>
                    <Grid container
                        spacing={7}>
                        <Grid container justify="center">
                            <Avatar alt="Club Logo" src="/assets/avatar.jpeg"
                                className={
                                    classes.avatar
                                }/>
                        </Grid>
                        <Grid item container
                            xs={12}
                            style={
                                { marginTop: "40px" }
                        }>
                            <form style={
                                { width: "100%" }
                            }>
                                <Grid container
                                    spacing={3}>
                                    <Grid item
                                        xs={6}>
                                        <TextField name="name"
                                            className={
                                                classes.input
                                            }
                                            label="Name"
                                            variant="outlined"
                                            value={
                                                data.name
                                            }
                                            aria-readonly
                                            disabled/>
                                    </Grid>
                                    <Grid item
                                        xs={6}>
                                        <TextField name="type"
                                            className={
                                                classes.input
                                            }
                                            label="Type"
                                            variant="outlined"
                                            value={
                                                data.type
                                            }
                                            aria-readonly
                                            disabled/>
                                    </Grid>
                                    <Grid item
                                        xs={12}>
                                        <TextField name="bio"
                                            className={
                                                classes.input
                                            }
                                            label="Description"
                                            multiline
                                            rows={8}
                                            variant="outlined"
                                            value={
                                                data.bio
                                            }
                                            aria-readonly
                                            disabled/>
                                    </Grid>
                                    <Grid item
                                        xs={6}>
                                        <a href={
                                                data.website
                                            }
                                            className="org-website-link"
                                            rel="noreferrer"
                                            target="_blank">
                                            <TextField name="website"
                                                className={
                                                    classes.input
                                                }
                                                label="Website Link"
                                                variant="outlined"
                                                value={
                                                    data.website
                                                }
                                                disabled/>
                                        </a>
                                    </Grid>
                                    <Grid item
                                        xs={6}>
                                        <TextField name="mobileNumber"
                                            className={
                                                classes.input
                                            }
                                            label="Contact Number"
                                            variant="outlined"
                                            value={
                                                data.mobileNumber
                                            }
                                            aria-readonly
                                            disabled/>
                                    </Grid>
                                    <Grid item
                                        xs={12}
                                        style={
                                            {
                                                marginTop: "5%",
                                                textAlign: "center"
                                            }
                                    }>
                                        <Button variant="contained" color="primary" className="custom-action-btn"
                                            style={
                                                {
                                                    paddingTop: "15px",
                                                    paddingBottom: "15px"
                                                }
                                        }>
                                            Apply for this organization
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default OrgProfile;
