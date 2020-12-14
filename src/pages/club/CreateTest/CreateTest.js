import {
	Divider,
	FormControlLabel,
	Grid,
	Slider,
	Switch,
	TextField,
	Typography,
} from "@material-ui/core";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import "./CreateTest.css";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const CreateTest = () => {
	const { register, handleSubmit, errors } = useForm();
	const [formDetails, setFormDetails] = useState({
		roundNumber: 1,
		roundType: "",
		instructions: "",
		duration: 0,
		maxMarks: 0,
		scheduledForDate: new Date(),
		scheduledEndDate: new Date(),
		graded: true,
	});

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
		console.log(event);
		setFormDetails((prevState) => ({
			...prevState,
			scheduledForDate: event.toDate(),
		}));
	};
	const handleEndDateChange = (event) => {
		console.log(event);
		setFormDetails((prevState) => ({
			...prevState,
			scheduledEndDate: event.toDate(),
		}));
	};

	const createTest = () => {
		console.log(formDetails);
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
					<div className="duration-select">
						<Typography id="duration-select" gutterBottom>
							Duration
						</Typography>
						<Slider
							name="duration"
							defaultValue={10}
							aria-labelledby="discrete-slider"
							valueLabelDisplay="auto"
							step={5}
							marks
							min={10}
							max={60}
							onChange={(e) => handleFormChange(e)}
						/>
					</div>
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
									/>
								</Grid>
							</Grid>
						</div>
					</MuiPickersUtilsProvider>
				</form>
			</div>
		</div>
	);
};

export default CreateTest;
