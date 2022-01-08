import { makeStyles, withStyles, Button } from '@material-ui/core';
import React from 'react';
import Logo from '../logo.png';

const useStyles = makeStyles( ( theme ) => ( {
    centerMiddle: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
} ) )

const ErrorPage = () => {
    const classes = useStyles();
    return (
        <div className={
            classes.centerMiddle
        }>
            <img src={Logo}
                alt="CET"
                width="150px"/>
            <br/>
            <h3 style={
                { fontFamily: 'Source Sans Pro' }
            }>
                Looks like you love exploring our page...
            </h3>
            <h4 style={
                { fontFamily: 'Source Sans Pro' }
            }>
                This page doesn't exist though. We strongly recommend you click the button below &darr;
            </h4>
            <Button variant="contained" color="primary" href="/"
                style={
                    {
                        textTransform: "capitalize",
                        border: "1px solid #1799E1",
                        backgroundColor: "#1799E1",
                        color: "white",
                        fontFamily: "Source Sans Pro",
                        height: "48px",
                        width: "188px",
                        borderRadius: "10px",
                        fontSize: "18px",
                        fontWeight: "600",
                        lineHeight: "150%",
                        outline: "none"
                    }
            }>
                Go Home
            </Button>
        </div>
    )
}

export default ErrorPage;
