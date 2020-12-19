import { Button, Dialog, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { useState } from "react";
import "./ProfileModals.css";
import Dropzone from "react-dropzone";
import Axios from "axios";

const UpdateProfilePhoto = ( { open, onClose } ) => {
    const [file, setFile] = useState( null );

    const handleFileDrop = ( acceptedFiles ) => {
        setFile( acceptedFiles[ 0 ] );
    };

    const updateFinal = async ( profile, token ) => {
        const url = `${
            process.env.REACT_APP_BACKEND_URL
        }api/club/avatar`;

        let final;

        try {
            await Axios.put( url, profile, {
                headers: {
                    Authorization: `Bearer ${ token }`
                }
            } ).then( ( res ) => {
                final = res;
            } );
        } catch ( error ) {
            console.log( error );
        }

        return final;
    };


    return (
        <Dialog open={open}
            onClose={onClose}
            fullWidth>
            <div style={
                    { textAlign: "center" }
                }
                className="profile-modal">
                <Typography variant="h4"
                    style={
                        { marginBottom: "10px" }
                }>
                    Update Profile Photo
                </Typography>
                <div className="dropzone">
                    <h3 style={
                        { color: "rgb(120, 120, 120)" }
                    }>
                        Upload a file:{" "} </h3>
                    <Dropzone onDrop={
                            ( acceptedFiles ) => handleFileDrop( acceptedFiles )
                        }
                        accept="image/jpeg, image/png, imahe/jpg">
                        {
                        ( { getRootProps, getInputProps } ) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()}/>
                                    <AddCircle className="drop-icon"/>
                                    <p style={
                                        { color: "rgb(120, 120, 120)" }
                                    }>
                                        {
                                        file ? `Selected file: ${
                                            file.name
                                        }` : "Drag & drop or click to select a image file"
                                    } </p>
                                </div>
                            </section>
                        )
                    } </Dropzone>
                </div>
                <Button color="primary" variant="contained" className="custom-action-btn"
                    style={
                        { marginTop: "30px" }
                }>
                    Upload Photo
                </Button>
            </div>
        </Dialog>
    );
};

export default UpdateProfilePhoto;
