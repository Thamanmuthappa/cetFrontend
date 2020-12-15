import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ location, home }) => {
	return (
		<AppBar
			position="static"
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
				<Typography variant="h5" className="nav-brand">
					{location}
				</Typography>
				{/* <Avatar alt="SB" /> */}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
