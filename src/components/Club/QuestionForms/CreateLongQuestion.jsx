import { Divider, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./QuestionForms.css";

const CreateLongQuestion = ({ testId, domainId }) => {
	const { register, handleSubmit } = useForm();

	const [question, setQuestion] = useState({
		type: "longAnswer",
		testId: testId,
		domainId: domainId,
		questionMarks: 0,
		description: "",
	});

	const handleFormChange = (e) => {
		setQuestion((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const submit = () => {
		console.log(question);
	};

	return (
		<div className="create-question-form">
			<Typography variant="h6" className="light-text">
				Question type: <strong>Long Answer</strong>
			</Typography>
			<form id="create-question-4" onSubmit={handleSubmit(submit)}>
				<TextField
					multiline
					rows={4}
					name="description"
					variant="outlined"
					label="Question Description"
					className="create-question-text-input"
					inputRef={register({ required: true })}
					value={question.description}
					onChange={handleFormChange}
				/>{" "}
				<br />
				<TextField
					name="questionMarks"
					type="number"
					variant="outlined"
					label="Question Marks"
					inputRef={register({ required: true })}
					value={question.questionMarks}
					onChange={handleFormChange}
				/>
			</form>
		</div>
	);
};

export default CreateLongQuestion;
