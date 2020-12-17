import React from "react";
import ChoiceQuestion from "./ChoiceQuestion";
import DescriptionQuestion from "./DescriptionQuestion";

const QuestionsDisplay = ({ questionType, question }) => {
	return (
		<div className="accordian-question-display">
			{questionType === "singleCorrect" ||
			questionType === "multipleCorrect" ? (
				<ChoiceQuestion question={question} />
			) : (
				<DescriptionQuestion question={question} />
			)}
		</div>
	);
};

export default QuestionsDisplay;
