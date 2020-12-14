import React, { createContext, useEffect, useReducer, useState } from "react";
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
			setLoginTrue();
		}

		setLoading(false);
	}, []);

	const setLoginTrue = () => {
		dispatch({ type: "SET_LOGIN_TRUE" });
	};

	const setClubDetails = (details) => {
		dispatch({ type: "SET_CLUB_DETAILS", payload: details });
	};

	const values = {
		...state,
		setLoginTrue,
		setClubDetails,
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
		case "SET_CLUB_DETAILS":
			return {
				...state,
				clubDetails: action.payload,
			};
	}
};
