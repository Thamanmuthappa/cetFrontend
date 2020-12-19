import React from "react";

const QuestionMedia = ({ question }) => {
	const { media } = question;

	if (!question.media) {
		return null;
	}

	return (
		<div className="question-media-div">
			{media.type === "image" ? (
				<img
					src={media.url}
					key={media.url}
					className="question-img"
					alt="question image"
				/>
			) : media.type === "video" ? (
				<video src={media.url} controls className="question-video" />
			) : media.type === "audio" ? (
				<audio src={media.url} controls />
			) : null}
		</div>
	);
};

export default QuestionMedia;
