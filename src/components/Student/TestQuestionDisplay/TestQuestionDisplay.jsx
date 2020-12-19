import React, { useState } from "react";
import MultipleCorrect from "./QuestionComponents/MultipleCorrect";
import SingleCorrect from "./QuestionComponents/SingleCorrect";
import TextQuestions from "./QuestionComponents/TextQuestions";
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
				<MultipleCorrect
					question={question}
					index={index}
					answers={answers}
					setAnswers={setAnswers}
				/>
			) : (
				<TextQuestions
					type={type}
					question={question}
					index={index}
					answers={answers}
					setAnswers={setAnswers}
				/>
			)}
		</div>
	);
};

export default TestQuestionDisplay;
