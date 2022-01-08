import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
} from "@material-ui/core";
import React from "react";
import QuestionMedia from "./QuestionMedia";

const SingleCorrect = ({ question, index, answers, setAnswers }) => {
	const handleOptionChange = (e) => {
		const curr = JSON.parse(JSON.stringify(answers));

		if (e.target.value === curr.submissions[index].answers[0]) {
			curr.submissions[index].answers[0] = "";
		} else {
			curr.submissions[index].answers[0] = e.target.value;
		}

		setAnswers(curr);
	};

	const isMedia = question.media;

	return (
		<div className="single-correct-question" style={{color: "#081220" }}>
			<Grid container spacing={0}>
				<Grid item xs={1} style={{color: "#fff"}}>
					<span style={{ marginRight: "30px", color: "fff" }}>Q. {index + 1}</span>
				</Grid>
				<Grid item xs={isMedia ? 6 : 11}>
					<div
						className="question-description"
						style={{ whiteSpace: "pre-wrap", color: "#fff" }}
					>
						{question.description}
					</div>

					<div className="question-options">
						<FormControl component="fieldset" style={{color: "#fff"}}>
							<FormLabel component="legend" style={{color: "#fff"}}>
								Options (Single Correct)
							</FormLabel>
							<RadioGroup
								value={answers.submissions[index].answers[0]}
							>
								{question.options.map((option, i) => (
									<FormControlLabel
										control={
											<Radio
												onClick={handleOptionChange}
												style={{color: "#1799E1"}}
											/>
										}
										value={option.optionId}
										label={option.text}
										key={i}
									/>
								))}
							</RadioGroup>
						</FormControl>
					</div>
				</Grid>
				<Grid item xs={5}>
					<QuestionMedia question={question} />
				</Grid>
			</Grid>
		</div>
	);
};

export default SingleCorrect;
