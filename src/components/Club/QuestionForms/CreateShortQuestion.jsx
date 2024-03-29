import {
	Divider,
	FormControlLabel,
	Switch,
	TextField,
	Typography,
	makeStyles
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./QuestionForms.css";
import { postQuestionInDomain } from "../../../API/POST";

const useStyles = makeStyles((theme) => ({
	input: {
	  color: "#FFF",
	},
	label: {
	  color: "#FFF",
	},
  }));

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

	const [media, setMedia] = useState(null);
	const [isMedia, setIsMedia] = useState(false);

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
		setMedia(null);
	};

	const submit = async () => {
		setLoading(true);
		const token = localStorage.getItem("clubAuthToken");

		const data = new FormData();

		for (let key in question) {
			data.append(key, question[key]);
		}

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
	const classes = useStyles();

	return (
		<div className="create-question-form" style={{background: "#081220"}}>
			<Typography variant="h6" style={{color: "#fff"}}>
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
					inputProps={{ className: classes.input }} 
					inputLabelProps={{ style: { color: '#fff' },}}
				/>{" "}
				<br />
				<Typography style={{color: "white"}}>
					<strong>Marks:</strong>
				</Typography>
				<TextField
					name="questionMarks"
					type="number"
					variant="outlined"
					// label="Question Marks"
					inputRef={register({ required: true })}
					value={question.questionMarks}
					onChange={handleFormChange}
					inputProps={{ className: classes.input }} 
					inputLabelProps={{ style: { color: '#fff' },}}
				/>
				<br />
				<div className="media-switch" style={{marginLeft:"-1.25%"}}>
					<FormControlLabel
						style={{color: "#fff"}}
						control={
							<Switch
								checked={isMedia}
								onChange={(e) => setIsMedia(e.target.checked)}
								style={{ color: "#1799E1" }}
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
						style={{color: "#fff"}}
					/>
				</div>
			</form>
		</div>
	);
};

export default CreateShortQuestion;
