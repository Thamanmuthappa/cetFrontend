import { Divider, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./QuestionForms.css";
import { postQuestionInDomain } from "../../../API/POST";

const CreateShortQuestion = ({
	testId,
	domainId,
	setLoading,
	addMarks,
	snackOps,
}) => {
	const { register, handleSubmit } = useForm();

	const [question, setQuestion] = useState({
		type: "shortAnswer",
		testId: testId,
		domainId: domainId,
		questionMarks: 0,
		description: "",
	});

	const { setQuestionSnack } = snackOps;

	const handleFormChange = (e) => {
		setQuestion((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const resetModal = () => {
		const curr = JSON.parse(JSON.stringify(question));
		curr.questionMarks = 0;
		curr.description = "";
		setQuestion(curr);
	};

	const submit = async () => {
		console.log(question);
		setLoading(true);
		const token = localStorage.getItem("clubAuthToken");

		const result = await postQuestionInDomain(question, token);

		if (result) {
			addMarks(question.questionMarks);
			setQuestionSnack(true);
			resetModal();
		}
		setLoading(false);
	};

	return (
		<div className="create-question-form">
			<Typography variant="h6" className="light-text">
				Question type: <strong>Short Answer</strong>
			</Typography>
			<form id="create-question-3" onSubmit={handleSubmit(submit)}>
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

export default CreateShortQuestion;
