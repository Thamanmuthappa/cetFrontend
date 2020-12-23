import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const ShortlistModal = ({
	open,
	onClose,
	selected,
	setSelected,
	domainId,
	setSuccess,
	refresh,
}) => {
	const [remark, setRemark] = useState("");
	const [disabled, setDisabled] = useState(false);

	const handleClose = () => {
		setRemark("");
		setSelected(null);
		onClose();
	};

	const shortlist = async () => {
		setDisabled(true);
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/shortlist`;
		const token = localStorage.getItem("clubAuthToken");

		const data = {
			domainId: domainId,
			studentId: selected.studentId._id,
			remark: remark,
		};

		try {
			await Axios.patch(url, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setDisabled(false);
				setSuccess(true);
				refresh();
				handleClose();
			});
		} catch (error) {
			console.log(error);
			setDisabled(false);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			{selected === null ? (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<CircularProgress color="primary" />
				</div>
			) : (
				<>
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
						<Button
							variant="outlined"
							onClick={handleClose}
							disabled={disabled}
						>
							Cancel
						</Button>
						<Button
							variant="contained"
							color="primary"
							disabled={disabled}
							onClick={shortlist}
						>
							Shortlist
						</Button>
					</DialogActions>
				</>
			)}
		</Dialog>
	);
};

export default ShortlistModal;
