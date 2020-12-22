import { Button, Dialog, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import "./ProfileModals.css";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { ClubContext } from "../../../context/ClubContext";

const UpdateBannerPhoto = ({ open, onClose, id, updateImages }) => {
	const [file, setFile] = useState(null);

	const [loading, setLoading] = useState(false);

	const { getProfile } = useContext(ClubContext);

	const handleFileDrop = (acceptedFiles) => {
		setFile(acceptedFiles[0]);
	};

	const handleBannerUpdate = async () => {
		setLoading(true);
		const url = `${process.env.REACT_APP_BACKEND_URL}/club/banner`;
		const token = localStorage.getItem("clubAuthToken");

		if (file === null) {
			return;
		}

		const data = new FormData();

		data.append("banner", file, id);

		try {
			await Axios.put(url, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setLoading(false);
				getProfile(token);
				onClose();
				updateImages();
			});
		} catch (error) {
		}
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<div style={{ textAlign: "center" }} className="profile-modal">
				<Typography variant="h4" style={{ marginBottom: "10px" }}>
					Update Banner Photo
				</Typography>
				<div className="dropzone">
					<h3
						style={{
							color: "rgb(120, 120, 120)",
						}}
					>
						Upload a file:{" "}
					</h3>
					<Dropzone
						onDrop={(acceptedFiles) =>
							handleFileDrop(acceptedFiles)
						}
						accept="image/jpeg, image/png, image/jpg"
					>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()}>
									<input {...getInputProps()} />
									<AddCircle className="drop-icon" />
									<p
										style={{
											color: "rgb(120, 120, 120)",
										}}
									>
										{file
											? `Selected file: ${file.name}`
											: "Drag 'n' drop or click to select a image file"}
									</p>
								</div>
							</section>
						)}
					</Dropzone>
				</div>
				<Button
					color="primary"
					variant="contained"
					className="custom-action-btn"
					style={{ marginTop: "30px" }}
					onClick={handleBannerUpdate}
					disabled={loading}
				>
					Upload Photo
				</Button>
			</div>
		</Dialog>
	);
};

export default UpdateBannerPhoto;
