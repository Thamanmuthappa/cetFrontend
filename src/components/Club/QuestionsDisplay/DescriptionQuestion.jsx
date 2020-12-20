import React from "react";

const DescriptionQuestion = ({ question }) => {
	return (
		<div className="accordian-correct">
			<a href={question.mediaURL} target="_blank" rel="noreferrer">
				{question.mediaURL}
			</a>
			<p>
				<strong>Marks:</strong>
				{question.questionMarks}{" "}
			</p>
		</div>
	);
};

export default DescriptionQuestion;
