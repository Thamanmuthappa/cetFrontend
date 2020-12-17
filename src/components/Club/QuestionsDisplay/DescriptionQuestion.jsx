import React from "react";

const DescriptionQuestion = ({ question }) => {
	return (
		<div className="accordian-correct">
			<p>
				<strong>Marks: </strong> {question.questionMarks}
			</p>
		</div>
	);
};

export default DescriptionQuestion;
