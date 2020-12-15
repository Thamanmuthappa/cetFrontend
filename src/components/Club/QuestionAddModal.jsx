import {
	AppBar,
	Button,
	Dialog,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemText,
	makeStyles,
	Slide,
	Toolbar,
	Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import React, { useState } from "react";
import clsx from "clsx";
import CreateSingleCorrect from "./QuestionForms/CreateSingleCorrect";

const useStyle = makeStyles((theme) => ({
	drawer: {
		width: 200,
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const questionTypes = [
	{
		id: 1,
		type: "singleCorrect",
		name: "Single Correct",
	},
	{
		id: 2,
		type: "multipleCorrect",
		name: "Multiple Correct",
	},
	{
		id: 3,
		type: "shortAnswer",
		name: "Short Answer",
	},
	{
		id: 4,
		type: "longAnswer",
		name: "Long Answer",
	},
];

const QuestionAddModal = ({ open, handleClose, testId, domainId }) => {
	const classes = useStyle();

	const [selectedType, setSelectedType] = useState(1);

	return (
		<Dialog
			onClose={handleClose}
			open={open}
			fullScreen
			style={{ zIndex: 1500 }}
			TransitionComponent={Transition}
		>
			<AppBar style={{ zIndex: 1401 }}>
				<Toolbar>
					<IconButton onClick={handleClose}>
						<Close style={{ fill: "white" }} />
					</IconButton>
					<Typography variant="h6" style={{ flex: 1 }}>
						Add a Question
					</Typography>
					<Button color="inherit" className="dialog-top-btn">
						Create
					</Button>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" classes={{ paper: classes.drawer }}>
				<Toolbar />
				<List>
					{questionTypes.map((type) => (
						<>
							<ListItem
								button
								key={type.id}
								className="add-question-drawer-item"
							>
								<ListItemText primary={type.name} />
							</ListItem>
							<Divider />
						</>
					))}
				</List>
			</Drawer>
			<div className="create-question-area">
				<Typography variant="h4">Enter Question details</Typography>
				<div className="create-question-display">
					{selectedType === 1 ? <CreateSingleCorrect /> : null}
				</div>
			</div>
		</Dialog>
	);
};

export default QuestionAddModal;
