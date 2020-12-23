import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Loading from "../../../pages/Loading";

const ShortlistModal = ({ open, onClose, selected, setSelected }) => {
	const [remark, setRemark] = useState("");

	const handleClose = () => {
		setRemark("");
		setSelected(null);
		onClose();
	};

	if (selected === null) {
		return <Loading />;
	}

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle style={{ textAlign: "center" }}>
				Shortlisting {selected.studentId.name}
			</DialogTitle>
			<DialogContent>
				<TextField
					name="remark"
					variant="outlined"
					value={remark}
					onChange={(e) => setRemark(e.target.value)}
					placeholder="Remarks"
					style={{ width: "100%" }}
				/>
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="contained" color="primary">
					Shortlist
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ShortlistModal;
