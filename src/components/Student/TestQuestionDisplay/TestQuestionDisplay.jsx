import React, { useState } from "react";
import SingleCorrect from "./QuestionComponents/SingleCorrect";
import "./TestQuestionDisplay.css";

const TestQuestionDisplay = ({ question, index, answers, setAnswers }) => {
	const [type] = useState(question.questionType);

	return (
		<div className="question-display-box">
			{type === "singleCorrect" ? (
				<SingleCorrect
					question={question}
					index={index}
					answers={answers}
					setAnswers={setAnswers}
				/>
			) : type === "multipleCorrect" ? (
				"Multiple Correct"
			) : type === "shortAnswer" ? (
				"Short Answer"
			) : type === "longAnswer" ? (
				"Long Answer"
			) : null}
		</div>
	);
};

export default TestQuestionDisplay;
