import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
} from "@material-ui/core";
import React from "react";
import QuestionMedia from "./QuestionMedia";

const MultipleCorrect = ({ question, index, answers, setAnswers }) => {
	const isChecked = (id) => {
		if (answers.submissions[index].answers.indexOf(id) !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const handleCheckboxChange = (e, id) => {
		const curr = JSON.parse(JSON.stringify(answers));

		if (isChecked(id)) {
			const ind = curr.submissions[index].answers.indexOf(id);
			curr.submissions[index].answers.splice(ind, 1);
		} else {
			curr.submissions[index].answers.push(id);
		}

		setAnswers(curr);
	};

	const isMedia = question.media;

	return (
		<div className="single-correct-question">
			<Grid container spacing={0}>
				<Grid item xs={1}>
					<span style={{ marginRight: "30px" }}>Q. {index + 1}</span>
				</Grid>
				<Grid item xs={isMedia ? 6 : 11}>
					<div className="question-description">
						{question.description}
					</div>

					<div className="question-options">
						<FormControl component="fieldset">
							<FormLabel component="legend">
								Options (Multiple Correct)
							</FormLabel>
							<FormGroup>
								{question.options.map((option, i) => (
									<FormControlLabel
										control={
											<Checkbox
												checked={isChecked(
													option.optionId
												)}
												onChange={(e) =>
													handleCheckboxChange(
														e,
														option.optionId
													)
												}
											/>
										}
										label={option.text}
										key={i}
									/>
								))}
							</FormGroup>
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

export default MultipleCorrect;
