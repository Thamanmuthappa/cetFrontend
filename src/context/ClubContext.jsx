import React, { createContext, useEffect, useReducer, useState } from "react";
import { fetchAdminProfile, fetchAllTests } from "../API/GET";
import Loading from "../pages/Loading";

export const ClubContext = createContext();

const initialState = {
	isLoggedIn: false,
	clubDetails: {},
	testsCreated: [],
};

const ClubContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(clubReducer, initialState);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("clubAuthToken");

		if (token) {
			setLoginTrue(token);
		} else {
			setLoading(false);
		}
	}, []);

	const setLoginTrue = async (token) => {
		const profile = await fetchAdminProfile(token);

		if (profile) {
			dispatch({ type: "SET_LOGIN_TRUE" });
			setClubDetails(profile);

			const tests = await fetchAllTests(token);
			setClubTests(tests);
		} else {
			localStorage.clear();
		}

		setLoading(false);
	};

	const setLoginFalse = async () => {
		localStorage.clear();
		dispatch({ type: "SET_LOGIN_FALSE" });
	};

	const setClubDetails = (details) => {
		dispatch({ type: "SET_CLUB_DETAILS", payload: details });
	};

	const setClubTests = (tests) => {
		console.log(tests);
		dispatch({ type: "SET_CLUB_TESTS", payload: tests });
	};

	const addTest = (test) => {
		dispatch({ type: "ADD_TEST", payload: test });
	};

	const setFeatured = (featured) => {
		dispatch({ type: "SET_FEATURED", payload: featured });
	};

	const getProfile = async (token) => {
		const profile = await fetchAdminProfile(token);
		if (profile) {
			setClubDetails(profile);
		}
	};

	const values = {
		...state,
		setLoginTrue,
		setLoginFalse,
		setClubDetails,
		addTest,
		setFeatured,
		getProfile,
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<ClubContext.Provider value={values}>{children}</ClubContext.Provider>
	);
};

export default ClubContextProvider;

const clubReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOGIN_TRUE":
			return {
				...state,
				isLoggedIn: true,
			};
		case "SET_LOGIN_FALSE":
			return {
				...state,
				isLoggedIn: false,
			};
		case "SET_CLUB_DETAILS":
			return {
				...state,
				clubDetails: action.payload,
			};
		case "SET_CLUB_TESTS":
			return {
				...state,
				testsCreated: action.payload,
			};
		case "ADD_TEST":
			return {
				...state,
				testsCreated: [...state.testsCreated, action.payload],
			};
		case "SET_FEATURED":
			return {
				...state,
				clubDetails: {
					club: {
						...state.clubDetails.club,
						featured: action.payload,
					},
				},
			};
	}
};
