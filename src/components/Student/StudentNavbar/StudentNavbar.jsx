import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const StudentNavbar = ({ location }) => {
	const history = useHistory();

	const handleLogout = () => {
		// setLoginFalse();

		history.push("/student/signin");
	};

	return (
		<AppBar
			className="navbar"
			style={{
				backgroundColor: "#fdf9f9",
				zIndex: "1400",

				position: "relative",
			}}
			elevation={2}
		>
			<Toolbar>
				<Link to={`/student/dashboard`}>
					<img
						src="/assets/Group2.png"
						alt="logo"
						className="nav-img"
					/>
				</Link>
				<Typography
					variant="h5"
					className="nav-brand"
					style={{ flex: 1 }}
				>
					{location}
				</Typography>
				{/* <Avatar alt="SB" /> */}
				<Button className="logout-btn-nav" onClick={handleLogout}>
					LogOut
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default StudentNavbar;
