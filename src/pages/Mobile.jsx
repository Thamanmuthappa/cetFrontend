import { makeStyles, withStyles } from '@material-ui/core';
import React from 'react';
import Logo from '../logo.png';

const useStyles = makeStyles( ( theme ) => ( {
    centerMiddle: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background:'#081220'
    }
} ) )

const Mobile = () => {
    const classes = useStyles();
    return (
        <div className={
            classes.centerMiddle
        }>
            <img src={Logo}
                alt="CET"
                width="150px"/>
            <br/>

            <h4 style={
                { color:"#fff" }
            }>
                Please use a laptop or desktop to use CET.
            </h4>
        </div>
    )
}

export default Mobile;
