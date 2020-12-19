import React, { useState } from "react";
import "./TestQuestionDisplay.css";

const TestQuestionDisplay = ({ question }) => {
	const [type] = useState(question.questionType);

	return (
		<div className="question-display-box">
			{type === "singleCorrect"
				? "Single Correct"
				: type === "multipleCorrect"
				? "Multiple Correct"
				: type === "shortAnswer"
				? "Short Answer"
				: type === "longAnswer"
				? "Long Answer"
				: null}
		</div>
	);
};

export default TestQuestionDisplay;
