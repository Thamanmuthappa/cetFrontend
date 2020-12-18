import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { fetchStudentProfile } from "../API/GET";
import Loading from "../pages/Loading";

export const StudentContext = createContext();

const initialState = {
	isLoggedIn: false,
	studentProfile: {},
};

const StudentContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(studentReducer, initialState);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("studentAuthToken");

		if (token) {
			setLoginTrue(token);
		} else {
			setLoading(false);
		}
	}, []);

	const setLoginTrue = async (token) => {
		const profile = await fetchStudentProfile(token);

		if (profile) {
			dispatch({ type: "SET_LOGIN_TRUE" });
			setStudentDetails(profile);
			localStorage.setItem("studentAuthToken", token);
		} else {
			localStorage.clear();
		}

		setLoading(false);
	};

	const setStudentDetails = (profile) => {
		dispatch({ type: "SET_STUDENT_PROFILE", payload: profile });
	};

	const value = {
		...state,
		setLoginTrue,
		setStudentDetails,
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<StudentContext.Provider value={value}>
			{children}
		</StudentContext.Provider>
	);
};

export default StudentContextProvider;

const studentReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOGIN_TRUE":
			return {
				...state,
				isLoggedIn: true,
			};
		case "SET_STUDENT_PROFILE":
			return {
				...state,
				studentProfile: action.payload,
			};
	}
};
