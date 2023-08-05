import {
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	Grid,
	Snackbar,
	Typography,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
	fetchAllTests,
	fetchTestDetails,
	fetchTestDomains,
} from "../../../API/GET";
import DomainAddModal from "../../../components/Club/DomainAddModal";
import ClubDomainTile from "../../../components/Club/DomainTile/ClubDomainTile";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import Loading from "../../Loading";
import "./TestDetails.css";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import { ClubContext } from "../../../context/ClubContext";

const TestDetails = (props) => {
	const id = props.match.params.id;
	const [loading, setLoading] = useState(true);

	const [testDetails, setTestDetails] = useState({});
	const [testDomains, setTestDomains] = useState([]);

	const [addDomainOpen, setAddDomain] = useState(false);

	const [confirmPublish, setConfirmPublish] = useState(false);
	const [confirmBtnLoading, setConfirmBtnLoading] = useState(false);
	const [publishSnack, setPublishSnack] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

	const history = useHistory();
	const { setClubTests } = useContext(ClubContext);

	const handlePublish = async () => {
		setConfirmBtnLoading(true);
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/publish`;
		const token = localStorage.getItem("clubAuthToken");

		const data = {
			testId: id,
		};

		try {
			await Axios.patch(url, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then((res) => {
				setConfirmPublish(false);
				setPublishSnack(true);
			});
		} catch (error) {}

		setConfirmBtnLoading(false);
	};

	const getDetails = async () => {
		setLoading(true);
		const token = localStorage.getItem("clubAuthToken");
		const details = await fetchTestDetails(id, token);
		const domains = await fetchTestDomains(id, token);
		setTestDetails(details);
		setTestDomains(domains);
		setLoading(false);
	};

	useEffect(() => {
		getDetails();
	}, []);

	const handleDelete = async () => {
		setDeleteLoading(true);
		const url = `${process.env.REACT_APP_BACKEND_URL}/test/delete`;
		const token = localStorage.getItem("clubAuthToken");

		const data = {
			testId: id,
		};

		try {
			await Axios.delete(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: data,
			}).then(async (res) => {
				const tests = await fetchAllTests(token);
				setClubTests(tests);

				history.replace("/club/dashboard");
			});
		} catch (error) {
			// console.log(error);
			setDeleteLoading(false);
		}
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="test-details-page">
			<Navbar location="Test Details" />
			<Container className="test-details-container">
				<div className="test-info">
					<h1>
						<a>Test Details</a>
					</h1>
					<div >
						<Grid container spacing={3}>
							<Grid item xs={6} sm={3}>
								<p>
									<strong>Round Number:</strong>{" "}
									{testDetails.roundNumber}
								</p>
								<p>
									<strong>Round Type:</strong>{" "}
									{testDetails.roundType}
								</p>
							</Grid>
							<Grid item xs={5}>
								<p>
									<strong>Start Time:</strong>{" "}
									{new Date(
										testDetails.scheduledForDate
									).toLocaleString()}
								</p>
								<p>
									<strong>End Time:</strong>{" "}
									{new Date(
										testDetails.scheduledEndDate
									).toLocaleString()}
								</p>
							</Grid>
							<Grid
								item
								xs={3}
								style={{
									display: "flex",
									justifyContent: "flex-end",
								}}
							>
								<Button
									color="primary"
									variant="contained"
									className="publish-btn"
									// disabled={testDetails.published}
									onClick={() => setConfirmPublish(true)}
									style={{ fontWeight: "bold" }}
								>
									Publish Test
								</Button>

								<Button
									color="primary"
									variant="contained"
									className="delete-test-btn"
									style={{ marginLeft: "10px" }}
									onClick={() => setConfirmDelete(true)}
								>
									Delete Test
								</Button>
							</Grid>
						</Grid>
					</div>
				</div>
				<Divider style={{background:"#F5F5F540"}}/>
				<div className="test-page-domain">
					
					<div
						className="test-page-domain-top"
						style={{display:"flex", justifyContent:"space-between", flexWrap:"wrap", alignItems:"center"}}
					>
						<h1>
						<a>Test Domains</a>
					</h1>
						<Button
							variant="contained"
							className="custom-action-btn"
							color="primary"
							onClick={() => setAddDomain(true)}
							style={{ textAlign: "right" }}
							// style={{ marginRight: "8%" }}
						>
							<Add /> Add a new domain
						</Button>
					</div>
					<div className="test-page-domain-list">
						{testDomains.length === 0 ? (
							<div className="test-page-no-domains">
								<Typography variant="h2" className="light-text">
									No domains created
								</Typography>
							</div>
						) : (
							<div className="test-page-domains-list">
								<Grid container spacing={3}>
									{testDomains.map((domain, i) => (
										<Grid key={i} item xs={12} sm={3}>
											<Link
												to={{
													pathname: `/club/test/${id}/${domain._id}`,
													state: { domain },
												}}
											>
												<ClubDomainTile
													title={domain.domainName}
												/>
											</Link>
										</Grid>
									))}
								</Grid>
							</div>
						)}
					</div>
				</div>
				{/* <Divider /> */}
			</Container>
			<DomainAddModal
				open={addDomainOpen}
				handleClose={() => setAddDomain(false)}
				id={id}
				refresh={getDetails}
				clubId={testDetails.clubId}
			/>
			<Dialog
				open={confirmPublish}
				onClose={() => setConfirmPublish(false)}
				style={{color:"#252D3A"}}
			>
				<DialogTitle style={{color: "white", background:"#252D3A"}}>
					Are you sure you want to publish this test?
				</DialogTitle>
				<DialogActions style={{color: "white", background:"#252D3A"}}>
					<Button
						variant="outlined"
						onClick={() => setConfirmPublish(false)}
						style={{ color: "white" , background:"#252D3A"}}
					>
						Cancel
					</Button>
					<Button
						color="primary"
						variant="contained"
						onClick={handlePublish}
						disabled={confirmBtnLoading}
					>
						Publish
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={publishSnack}
				autoHideDuration={5000}
				onClose={() => setPublishSnack(false)}
			>
				<Alert variant="filled" severity="success">
					Test published!
				</Alert>
			</Snackbar>

			<Dialog
				open={confirmDelete}
				onClose={() => setConfirmDelete(false)}
				style={{color:"252D3A"}}
			>
				<DialogTitle  style={{color: "white", background:"#252D3A"}}> 
					Are you sure you want to delete this test?
				</DialogTitle>
				<DialogContent style={{ textAlign: "center",color: "white", background:"#252D3A"}}>
					<span className="light-text">
						All the submissions (if any) will also be lost.
					</span>
				</DialogContent>
				<DialogActions  style={{color: "white", background:"#252D3A"}}>
					<Button
						variant="outlined"
						onClick={() => setConfirmDelete(false)}
						style={{color: "white", background:"#252D3A"}}
					>
						Cancel
					</Button>
					<Button
						color="primary"
						variant="contained"
						onClick={handleDelete}
						disabled={deleteLoading}
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default TestDetails;
