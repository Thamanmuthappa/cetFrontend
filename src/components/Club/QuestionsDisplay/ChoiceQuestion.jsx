import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Adjust } from "@material-ui/icons";
import React from "react";

const ChoiceQuestion = ({ question }) => {
	const { options } = question;

	return (
		<div className="accordian-correct">
			<p>
				<strong>Marks: </strong> {question.questionMarks}
			</p>
			<div className="accordian-options-list">
				<List>
					{options.map((option) => (
						<ListItem
							button
							key={option._id}
							style={{ paddingTop: "0" }}
						>
							<ListItemIcon>
								<Adjust
									style={{
										color: option.option.isCorrect
											? "green"
											: "black",
									}}
								/>
							</ListItemIcon>
							<ListItemText
								style={{
									color: option.option.isCorrect
										? "green"
										: "black",
								}}
								primary={option.option.text}
							/>
						</ListItem>
					))}
				</List>
			</div>
		</div>
	);
};

export default ChoiceQuestion;
