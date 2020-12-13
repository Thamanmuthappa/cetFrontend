import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    makeStyles,
    MenuItem,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 140,
    },
    paper: {
        position: "absolute",
        width: "400",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #E45044",
        borderRadius: "10px",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    root: {
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "4px 4px 50px rgba(0, 0, 0, 0.05)",
        borderRadius: "30px",
        textAlign: "center",
        height: "auto",
        width: "80%",
        margin: "0 auto",
    },
    gridList: {
        width: 800,
        height: 450,
    },
    gridContainer: {
        height: "100%",
    },
    gridContainerBox: {
        width: "100%",
        margin: 0,
        padding: "2rem",
    },
    cardContent: {
        textAlign: "center",
        fontFamily: "Source Sans Pro",
        fontSize: "1rem",
    },
    gridItemContainer: {
        margin: "0 auto",
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors, watch } = useForm();
    const [open, setOpen] = useState(false);
    const password = useRef({});
    password.current = watch("password", "");

    const handleFormSubmit = () => {
        setOpen(true);
    }

    return (
        <div
            className="bg-image"
            style={{
                backgroundSize: "cover",
                height: "100vh",
                width: "100%",
                backgroundPosition: "top",
            }}
        >
            <img
                src="/assets/Group2.png"
                alt="CET"
                style={{
                    textAlign: "left",
                    width: "10rem",
                    height: "auto",
                    position: "absolute",
                    left: "7rem",
                    top: "5rem",
                }}
            />
            <Grid
                container
                alignItems="center"
                className={classes.gridContainer}
                spacing={0}
            >
                <Grid item container sm={12} md={6}>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <Card className={classes.root}>
                            <CardContent className={classes.cardContent}>
                                <Grid
                                    container
                                    spacing={2}
                                    className={classes.gridContainerBox}
                                >
                                    <Grid item xs={12}>
                                        <Typography
                                            gutterBottom
                                            variant="h4"
                                            component="h2"
                                            style={{
                                                fontFamily: "Source Sans Pro",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Welcome
										</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            Sign Up for your account!
										</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="name"
                                            label="Name *"
                                            variant="outlined"
                                            type="text"
                                            inputRef={register({
                                                required: true,
                                            })}
                                            error={errors.name}
                                            helperText={
                                                errors.name &&
                                                "Name is required"
                                            }
                                            className="form-input"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="email"
                                            label="Email *"
                                            variant="outlined"
                                            type="email"
                                            className="form-input"
                                            inputRef={register({
                                                required: true,
                                            })}
                                            error={errors.email}
                                            helperText={
                                                errors.email &&
                                                "Email is required"
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="password"
                                            label="Password *"
                                            variant="outlined"
                                            type="password"
                                            inputRef={register({
                                                required: true,
                                                minLength: 8
                                            })}
                                            error={errors.password}
                                            helperText={
                                                (errors.password?.type ===
                                                    "required" &&
                                                    "Password is required") ||
                                                (errors.password?.type ===
                                                    "minLength" &&
                                                    "Password should be at least 8 characters long!")
                                            }
                                            className="form-input"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="rpassword"
                                            label="Retype Password *"
                                            variant="outlined"
                                            type="password"
                                            inputRef={register({
                                                validate: value =>
                                                    value === password.current || "The passwords do not match"
                                            })}
                                            className="form-input"
                                            error={errors.rpassword}
                                            helperText={errors.rpassword && "The passwords do not match"}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="type"
                                            select
                                            label="Club Category *"
                                            variant="outlined"
                                            inputRef={register({
                                                required: true,
                                            })}
                                            error={errors.type}
                                            helperText={
                                                errors.type &&
                                                "Field is required"
                                            }
                                            className="form-input"
                                        >
                                            <MenuItem value="Technical">Technical</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}></Grid>

                                    <Grid item xs={12}>
                                        <p style={{ textAlign: "center" }}>
                                            Already have an account?{" "}
                                            <span style={{ color: "#E45044" }}>
                                                <Link
                                                    to="/club/signin"
                                                    style={{
                                                        marginRight: "10px",
                                                    }}
                                                >
                                                    Sign In
												</Link>
                                            </span>
                                        </p>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            style={{
                                                textTransform: "capitalize",
                                                border: "1px solid #E45044",
                                                backgroundColor: "#E45044",
                                                color: "white",
                                                fontFamily: "Source Sans Pro",
                                                height: "48px",
                                                width: "188px",
                                                borderRadius: "10px",
                                                fontSize: "18px",
                                                fontWeight: "600",
                                                lineHeight: "150%",
                                                outline: "none",
                                            }}
                                        >
                                            Sign Up
										</Button>
                                    </Grid>
                                </Grid>

                                <br />
                            </CardContent>
                        </Card>
                    </form>
                </Grid>
                <Dialog
                    style={{ fontSize: "1.6rem" }}
                    aria-labelledby="form-dialog-title"
                    open={open}
                >
                    <DialogContent>
                        <p>Enter the OTP you received on your email</p>
                        <form autoComplete="off">
                            <TextField
                                name="otp"
                                label="Enter OTP"
                                variant="outlined"
                                type="otp"
                                id="batch-name"
                                className="form-input"
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="secondary"
                            style={{
                                float: "left",
                                position: "absolute",
                                left: 30,
                            }}
                        >
                            Resend
								</Button>

                        <Button
                            color="secondary"
                            style={{ outline: "none" }}
                        >
                            Done
								</Button>
                    </DialogActions>
                </Dialog>
                <Grid item xs={6} style={{ textAlign: "center" }}>
                    <img
                        src="/assets/celebration.png"
                        alt=""
                        height="auto"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default SignUp;
