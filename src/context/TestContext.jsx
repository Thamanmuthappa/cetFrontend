// import React, { createContext, useEffect, useReducer, useState } from "react";
// import CountDown from "../components/CountDown/CountDown";
// import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
// import axios from "axios";
// import CountDownModal from "../components/CountDownModal/CountDownModal";
// import { fullScreenListeners, removeFullScreenListeners, fullscreenWindow } from "../pages/Student/TestScreen/utils";
// import Loading from "../pages/Loading";

// export const TestContext = createContext();

// const initialState = {
// 	remaining_time: 10000000000,
// 	open_time: Date.now(),
// };

// const TestContextProvider = ({ children }) => {
// 	const [state, dispatch] = useReducer(TestReducer, initialState);

// 	const [countdownModal, setCountdownModal] = useState(false);
// 	const [testEnded, setTestEnded] = useState(false);
// 	const [violated, setViolated] = useState(false);

// 	const [confirmEnd, setConfirmEnd] = useState(false);

// 	const setOpenTime = (time) => {
// 		dispatch({ type: "SET_OPEN_TIME", data: time });
// 	};

// 	const setRemainingTime = (time) => {
// 		// console.log(time);
// 		dispatch({ type: "SET_REMAINING_TIME", data: time });
// 	};

// 	const submitTest = async () => {
// 		// console.log("Submitting Test");
// 		setTestEnded(true);
// 		const token = localStorage.getItem("studentAuthToken");
// 		const url = `${process.env.REACT_APP_BACKEND_URL}/attempt/submit`;
// 		try {
// 			await axios
// 				.post(
// 					url,
// 					{},
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					}
// 				)
// 				.then((res) => {
// 					// console.log(res);
// 					window.location.replace("/thanks");
// 				});
// 		} catch (error) {
// 			// console.log(error);
// 		}
// 	};

// 	const timer = (
// 		<CountDown
// 			endTime={new Date(state.open_time + state.remaining_time)}
// 			onComplete={submitTest}
// 		/>
// 	);

// 	const endTest = (
// 		<Button
// 			variant="contained"
// 			color="secondary"
// 			className="submit-btn"
// 			onClick={() => setConfirmEnd(true)}
// 		>
// 			End Test
// 		</Button>
// 	);
// 	const value = {
// 		...state,
// 		timer,
// 		endTest,
// 		setRemainingTime,
// 		setOpenTime,
// 	};

// 	const handleTabChange = () => {
// 		setCountdownModal(true);
// 		// console.log(document.visibilityState);
// 	};

// 	const handleFullScreenExit = () => {
// 		if (
// 			!document.webkitIsFullScreen &&
// 			!document.mozFullScreen &&
// 			!document.msFullscreenElement
// 		) {
// 			handleTabChange();
// 		}
// 	};

// 	const handleModalClose = () => {
// 		setCountdownModal(false);
// 		fullscreenWindow();
// 	};

// 	const handleTestViolation = () => {
// 		setViolated(true);
// 		submitTest();
// 	};

// 	useEffect(() => {
// 		window.addEventListener("visibilitychange", handleTabChange);
// 		window.addEventListener("blur", handleTabChange);
// 		fullScreenListeners(handleFullScreenExit);

// 		return () => {
// 			window.removeEventListener("visibilitychange", handleTabChange);
// 			window.removeEventListener("blur", handleTabChange);
// 			removeFullScreenListeners(handleFullScreenExit);
// 			// console.log("unmount");
// 		};
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	if (testEnded) {
// 		return <Loading violated={violated} />;
// 	}

// 	return (
// 		<TestContext.Provider value={value}>
// 			{children}
// 			<CountDownModal
// 				open={countdownModal}
// 				onClose={handleModalClose}
// 				onComplete={handleTestViolation}
// 			/>
// 			{/* <Dialog open={confirmEnd} onClose={() => setConfirmEnd(false)}>
// 				<DialogTitle>Are you sure you want to submit this test?</DialogTitle>
// 				<DialogActions>
// 					<Button
// 						variant="contained"
// 						color="primary"
// 						className="modal-back-btn"
// 						onClick={() => setConfirmEnd(false)}
// 					>
// 						No
// 					</Button>
// 					<Button
// 						variant="contained"
// 						color="primary"
// 						className="modal-confirm-btn"
// 						onClick={submitTest}
// 					>
// 						Yes
// 					</Button>
// 				</DialogActions>
// 			</Dialog> */}
// 		</TestContext.Provider>
// 	);
// };

// export default TestContextProvider;

// const TestReducer = (state, action) => {
// 	switch (action.type) {
// 		case "SET_REMAINING_TIME":
// 			return {
// 				...state,
// 				remaining_time: action.data,
// 			};
// 		case "SET_OPEN_TIME":
// 			return {
// 				...state,
// 				open_time: action.data,
// 			};

// 		default:
// 			return {
// 				...state,
// 			};
// 	}
// };