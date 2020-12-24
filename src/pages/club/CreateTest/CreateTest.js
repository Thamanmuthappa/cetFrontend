import {
	Button,
	CircularProgress,
	Divider,
	FormControlLabel,
	Grid,
	Slider,
	Switch,
	TextField,
	Typography,
} from "@material-ui/core";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import "./CreateTest.css";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { ClubContext } from "../../../context/ClubContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const CreateTest = () => {
	const { register, handleSubmit } = useForm();
	const [formDetails, setFormDetails] = useState({
		roundNumber: 1,
		roundType: "",
		instructions: "",

		scheduledForDate: new Date(),
		scheduledEndDate: new Date(),
		graded: true,
	});

	const { addTest } = useContext(ClubContext);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const [loading, setLoading] = useState(false);

	const history = useHistory();

	const handleSlider = (event) => {
		setFormDetails((prevState) => ({
			...prevState,
			[event.target.name]: event.target.checked,
		}));
	};

	const handleFormChange = (event) => {
		setFormDetails((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}));
	};

	const handleDateChange = (event) => {
		setFormDetails((prevState) => ({
			...prevState,
			scheduledForDate: event.toDate(),
		}));
	};
	const handleEndDateChange = (event) => {
		setFormDetails((prevState) => ({
			...prevState,
			scheduledEndDate: event.toDate(),
		}));
	};

	const createTest = async () => {
		setLoading(true);
		const details = JSON.parse(JSON.stringify(formDetails));

		const captcha = await executeRecaptcha();

		details.scheduledForDate = new Date(details.scheduledForDate).getTime();
		details.scheduledEndDate = new Date(details.scheduledEndDate).getTime();
		details.captcha = captcha;
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/create`;
		const token = localStorage.getItem("clubAuthToken");

		try {
			await Axios.post(url, details, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setLoading(false);
				addTest(res.data.testDetails);
				history.push(`/club/test/${res.data.testDetails._id}`);
			});
		} catch (error) {}
	};

	return (
		<div className="create-test-page">
			<Navbar location="Create Test" />
			<div className="create-test-main">
				<div
					className="create-test-header"
					style={{ textAlign: "center" }}
				>
					<h1>CREATE A NEW TEST</h1>
				</div>
				<form
					className="create-test-form"
					onSubmit={handleSubmit(createTest)}
				>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<FormControlLabel
								control={
									<Switch
										name="graded"
										size="medium"
										onChange={handleSlider}
										checked={formDetails.graded}
									/>
								}
								label="Graded"
								labelPlacement="start"
								style={{ margin: "20px 0" }}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								name="roundNumber"
								type="number"
								label="Round number"
								variant="outlined"
								className="test-create-input"
								value={formDetails.roundNumber}
								onChange={(e) => handleFormChange(e)}
								inputRef={register({ required: true })}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								name="roundType"
								label="Round type"
								variant="outlined"
								className="test-create-input"
								value={formDetails.roundType}
								onChange={(e) => handleFormChange(e)}
								inputRef={register({ required: true })}
							/>
						</Grid>
					</Grid>
					<TextField
						multiline
						rows={6}
						name="instructions"
						label="Test Instructions"
						variant="outlined"
						className="test-create-input"
						value={formDetails.instructions}
						onChange={(e) => handleFormChange(e)}
						inputRef={register({ required: true })}
					/>

					<Divider />
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<div className="date-time-picker-section">
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<DateTimePicker
										name="scheduledForDate"
										label="Start date &amp; time"
										inputVariant="outlined"
										value={formDetails.scheduledForDate}
										onChange={handleDateChange}
										className="test-create-input"
										format="DD MMMM YYYY | hh:mm a"
										minDate={new Date()}
										inputRef={register({ required: true })}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<DateTimePicker
										name="scheduledEndDate"
										label="End date &amp; time"
										inputVariant="outlined"
										value={formDetails.scheduledEndDate}
										onChange={handleEndDateChange}
										className="test-create-input"
										format="DD MMMM YYYY | hh:mm a"
										minDate={new Date()}
										inputRef={register({ required: true })}
									/>
								</Grid>
							</Grid>
						</div>
					</MuiPickersUtilsProvider>
					<div className="create-test-btn-div">
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="custom-action-btn"
							disabled={loading}
						>
							{!loading ? (
								"Create Test"
							) : (
								<CircularProgress
									size={20}
									style={{ padding: "3px 10px" }}
								/>
							)}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateTest;
