import { Divider, TextField, Typography } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import "./QuestionForms.css";

const CreateSingleCorrect = () => {
	const { register, handleSubmit } = useForm();

	const submit = () => {
		console.log("sddss");
	};

	return (
		<div className="create-question-form">
			<Typography variant="h6" className="light-text">
				Question type: <strong>Single Correct</strong>
			</Typography>
			<form id="create-question-1" onSubmit={handleSubmit(submit)}>
				<TextField
					multiline
					rows={4}
					name="description"
					variant="outlined"
					label="Question Description"
					className="create-question-text-input"
				/>{" "}
				<br />
				<Typography className="light-text">
					<strong>OPTIONS:</strong>
				</Typography>
			</form>
		</div>
	);
};

export default CreateSingleCorrect;
