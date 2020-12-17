import {
	Checkbox,
	FormControlLabel,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./QuestionForms.css";
import { postQuestionInDomain } from "../../../API/POST";

const optionsArr = [
	{ option: { text: "", isCorrect: true } },
	{ option: { text: "", isCorrect: false } },
	{ option: { text: "", isCorrect: false } },
	{ option: { text: "", isCorrect: false } },
];

const CreateSingleCorrect = ({ testId, domainId, setLoading, addMarks }) => {
	const { register, handleSubmit } = useForm();

	const [question, setQuestion] = useState({
		type: "singleCorrect",
		testId: testId,
		domainId: domainId,
		questionMarks: 0,
		description: "",
		options: optionsArr,
	});

	const [currentSelected, setCurrentSelected] = useState(0);

	const handleOptionChange = (e, i) => {
		const curr = JSON.parse(JSON.stringify(question));

		curr.options[i].option.text = e.target.value;

		setQuestion(curr);
	};

	const handleIsCorrectChange = (e, i) => {
		if (i === currentSelected) return;

		const curr = JSON.parse(JSON.stringify(question));

		curr.options[currentSelected].option.isCorrect = false;
		curr.options[i].option.isCorrect = true;

		setQuestion(curr);
		setCurrentSelected(i);
		console.log(optionsArr);
	};

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
		curr.options = optionsArr;

		setQuestion(curr);
	};

	const submit = async () => {
		console.log(question);
		setLoading(true);
		const token = localStorage.getItem("clubAuthToken");

		const result = await postQuestionInDomain(question, token);

		if (result) {
			addMarks(question.questionMarks);
			resetModal();
		}
		setLoading(false);
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
					inputRef={register({ required: true })}
					value={question.description}
					onChange={handleFormChange}
				/>{" "}
				<br />
				<Typography className="light-text">
					<strong>OPTIONS:</strong>
				</Typography>
				<div className="options-form" style={{ marginBottom: 30 }}>
					{question.options.map((option, i) => (
						<div style={{ display: "flex", alignItems: "center" }}>
							<TextField
								name={`Option ${i + 1}`}
								variant="outlined"
								label={`Option ${i + 1}`}
								value={question.options[i].option.text}
								onChange={(e) => handleOptionChange(e, i)}
								className="create-option-field"
								inputRef={register({ required: true })}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={
											question.options[i].option.isCorrect
										}
										onChange={(e) =>
											handleIsCorrectChange(e, i)
										}
									/>
								}
								label="Is Correct?"
							/>
							<br />
						</div>
					))}
				</div>
				<Typography className="light-text">
					<strong>Marks:</strong>
				</Typography>
				<TextField
					name="questionMarks"
					type="number"
					variant="outlined"
					label="Question Marks"
					inputRef={register({ required: true })}
					value={question.questionMarks}
					onChange={handleFormChange}
					className="create-question-marks-field"
				/>
			</form>
		</div>
	);
};

export default CreateSingleCorrect;
