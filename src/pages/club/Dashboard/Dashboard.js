import React, { useState } from "react";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import "./Dashboard.css";
import ClubProfile from "../Profile/Profile";
import ClubSidebar from "../Sidebar";
import ClubTestScreen from "../Tests/ClubTestScreen";

const Dashboard = () => {
	const [selectedTab, setSelectedTab] = useState(0);

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
