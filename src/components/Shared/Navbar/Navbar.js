import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { ClubContext } from "../../../context/ClubContext";
import "./Navbar.css";

const Navbar = ({ location, home }) => {
	const history = useHistory();

	const { setLoginFalse } = useContext(ClubContext);

	const handleLogout = () => {
		setLoginFalse();

		history.push("/club/signin");
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
				<Link to="/club/dashboard">
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

export default Navbar;
