import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slider,
	TextField,
	Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const DomainAddModal = ({ open, handleClose, id, refresh, clubId }) => {
	const { register, handleSubmit } = useForm();
	const [formValues, setFormValues] = useState({
		testId: id,
		clubId: clubId,
		domainName: "",
		domainDuration: 10,
		domainDescription: "",
		domainInstructions: "",
	});

	const [loading, setLoading] = useState(false);

	const handleFormChange = (e) => {
		setFormValues((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const handleDurationChange = (e, val) => {
		setFormValues((prevState) => ({
			...prevState,
			domainDuration: val,
		}));
	};

	const handleFormSubmit = async () => {
		setLoading(true);
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/add`;
		const token = localStorage.getItem("clubAuthToken");

		try {
			await Axios.post(url, formValues, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setLoading(false);
				handleClose();
				refresh();
			});
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<Dialog onClose={handleClose} open={open} fullWidth>
			<DialogTitle>Add a Domain</DialogTitle>
			<DialogContent>
				<form
					id="add-domain-form"
					onSubmit={handleSubmit(handleFormSubmit)}
				>
					<TextField
						variant="outlined"
						name="domainName"
						label="Domain Name"
						value={formValues.domainName}
						onChange={handleFormChange}
						className="test-create-input"
						inputRef={register({ required: true })}
					/>
					<TextField
						variant="outlined"
						name="domainDescription"
						label="Domain Description"
						value={formValues.domainDescription}
						onChange={handleFormChange}
						className="test-create-input"
						inputRef={register({ required: true })}
					/>
					<TextField
						multiline
						rows={6}
						name="domainInstructions"
						label="Domain Instructions"
						variant="outlined"
						className="test-create-input"
						value={formValues.instructions}
						onChange={handleFormChange}
						inputRef={register({ required: true })}
					/>
					<div
						className="domain-slider"
						style={{ margin: "10px 5%" }}
					>
						<Typography id="duration-select" gutterBottom>
							Domain Duration:{" "}
							<strong>{formValues.domainDuration} minutes</strong>
						</Typography>
						<Slider
							name="domainDuration"
							defaultValue={10}
							aria-labelledby="discrete-slider"
							valueLabelDisplay="auto"
							step={5}
							marks
							min={10}
							max={180}
							onChange={handleDurationChange}
						/>
					</div>
				</form>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					type="submit"
					form="add-domain-form"
					disabled={loading}
				>
					<strong>Add</strong>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DomainAddModal;
