import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import CountDown from "../CountDown/CountDown";
import "./CountDownModal.css";

const CountDownModal = ({ open, onClose, onComplete }) => {
	return (
		<Dialog className="countdown-modal" open={open} onClose={onClose} fullWidth>
			<DialogTitle>Went out of test area! Test will automatically close in</DialogTitle>
			<DialogContent>
				<CountDown endTime={Date.now() + 15000} onComplete={onComplete} />
			</DialogContent>
			<DialogActions className="button-div">
				<Button color="#FFF" className="close-modal" onClick={onClose}>
					Go back to the test
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CountDownModal;