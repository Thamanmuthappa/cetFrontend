import {
	Checkbox,
	FormControlLabel,
	Switch,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./QuestionForms.css";
import { postQuestionInDomain } from "../../../API/POST";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const optionsArr = [
	{ option: { text: "", isCorrect: true } },
	{ option: { text: "", isCorrect: false } },
	{ option: { text: "", isCorrect: false } },
	{ option: { text: "", isCorrect: false } },
];

const CreateMultipleCorrect = ({
	testId,
	domainId,
	setLoading,
	addMarks,
	snackOps,
}) => {
	const { register, handleSubmit } = useForm();

	const [question, setQuestion] = useState({
		type: "multipleCorrect",
		testId: testId,
		domainId: domainId,
		questionMarks: 0,
		description: "",
		options: optionsArr,
	});

	const [currentSelected, setCurrentSelected] = useState([0]);

	const [media, setMedia] = useState(null);
	const [isMedia, setIsMedia] = useState(false);

	const { setQuestionSnack } = snackOps;
	const { executeRecaptcha } = useGoogleReCaptcha();

	const handleOptionChange = (e, i) => {
		const curr = JSON.parse(JSON.stringify(question));

		curr.options[i].option.text = e.target.value;

		setQuestion(curr);
	};

	const handleIsCorrectChange = (e, i) => {
		let change = true;

		const ind = currentSelected.indexOf(i);

		if (ind !== -1 && currentSelected.length === 1) return;
		else if (ind !== -1) {
			change = false;
			const curr = JSON.parse(JSON.stringify(currentSelected));
			curr.splice(ind, 1);
			setCurrentSelected(curr);
		}

		const curr = JSON.parse(JSON.stringify(question));

		curr.options[i].option.isCorrect = change;

		if (ind === -1) setCurrentSelected((prev) => [...prev, i]);

		setQuestion(curr);
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
		setMedia(null);
	};

	const submit = async () => {
		setLoading(true);
		const token = localStorage.getItem("clubAuthToken");

		const data = new FormData();

		for (let key in question) {
			if (key === "options") {
				continue;
			}

			data.append(key, question[key]);
		}

		data.append("options", JSON.stringify(question.options));

		if (isMedia) {
			data.append("media", media);
		}

		const result = await postQuestionInDomain(data, token);

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
				Question type: <strong>Multiple Correct</strong>
			</Typography>
			<form id="create-question-2" onSubmit={handleSubmit(submit)}>
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
				<div className="media-switch">
					<FormControlLabel
						control={
							<Switch
								checked={isMedia}
								onChange={(e) => setIsMedia(e.target.checked)}
							/>
						}
						label="Add Media (Image/Audio/Video): "
						labelPlacement="start"
					/>
				</div>
				<div
					style={{ display: isMedia ? "block" : "none" }}
					className="add-media-section"
				>
					<input
						type="file"
						name="media"
						onChange={(e) => setMedia(e.target.files[0])}
						accept=".jpg,.jpeg,.png,.mp3,.wav,.mp4,.mkv,.mov"
						ref={register({ required: isMedia })}
					/>
				</div>
			</form>
		</div>
	);
};

export default CreateMultipleCorrect;
