import { Divider, TextField, Typography } from "@material-ui/core";
import React from "react";
import "./QuestionForms.css";

const CreateSingleCorrect = () => {
	return (
		<div className="create-question-form">
			<Typography variant="h6" className="light-text">
				Question type: <strong>Single Correct</strong>
			</Typography>
			<form>
				<TextField
					multiline
					rows={4}
					name="description"
					variant="outlined"
					label="Question Description"
					className="create-question-text-input"
				/>{" "}
				<br />
				<Typography variant="p" className="light-text">
					<strong>OPTIONS:</strong>
				</Typography>
			</form>
		</div>
	);
};

export default CreateSingleCorrect;
