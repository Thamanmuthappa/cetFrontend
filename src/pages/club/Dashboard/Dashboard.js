import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import "./Dashboard.css";
import ClubProfile from "../Profile/Profile";
import ClubSidebar from "../../../components/Club/Sidebar";
import ClubTestScreen from "../Tests/ClubTestScreen";
import { ClubContext } from "../../../context/ClubContext";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
	const { isLoggedIn } = useContext(ClubContext);
	const [selectedTab, setSelectedTab] = useState(0);

	const history = useHistory();

	useEffect(() => {
		if (!isLoggedIn) {
			history.push("/club/signin");
		}
	}, [isLoggedIn]);

	return (
		<div className="dashboard">
			<Navbar location="Dashboard" />
			<ClubSidebar setSelectedTab={setSelectedTab} />
			<div className="dash-main">
				{selectedTab === 0 ? <ClubTestScreen /> : null}
				{selectedTab === 2 ? <ClubProfile /> : null}
			</div>
		</div>
	);
};

export default Dashboard;
