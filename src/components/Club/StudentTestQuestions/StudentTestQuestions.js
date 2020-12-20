import React, { useEffect } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slider,
	TextField,
	Typography,
	Divider,
} from "@material-ui/core";
import TestQuestion from "./TestQuestion/TestQuestion";

const StudentTestQuestions = (props) => {
	let questions = props.details.map((question, i) => (
		<TestQuestion key={i} question={question} />
	));

	useEffect(() => {
		console.log(props.details);
	}, []);

	return (
		<div>
			{questions}
			<Divider />
		</div>
	);
};

export default StudentTestQuestions;
