import { Grid, TextField } from "@material-ui/core";
import React from "react";

const TextQuestions = ({ type, question, index, answers, setAnswers }) => {
	const handleAnswerChange = (e) => {
		const curr = JSON.parse(JSON.stringify(answers));

		curr.submissions[index].answers[0] = e.target.value;

		setAnswers(curr);
	};

	return (
		<div>
			<div className="single-correct-question">
				<Grid container spacing={0}>
					<Grid item xs={1}>
						<span style={{ marginRight: "30px" }}>
							Q. {index + 1}
						</span>
					</Grid>
					<Grid item xs={11}>
						<div className="question-description">
							{question.description}
						</div>
						<div className="question-input">
							<TextField
								placeholder="Enter your answer here"
								name="password"
								variant="outlined"
								autoComplete="off"
								multiline={type === "longAnswer"}
								rows={6}
								value={answers.submissions[index].answers[0]}
								style={{ width: "100%" }}
								onChange={handleAnswerChange}
							/>
						</div>
					</Grid>
				</Grid>
			</div>
		</div>
	);
};

export default TextQuestions;
