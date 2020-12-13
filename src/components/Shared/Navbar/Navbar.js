import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import "./Navbar.css";

const Navbar = ({ location }) => {
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
				<img src="/assets/Group2.png" alt="logo" className="nav-img" />
				<Typography variant="h5" className="nav-brand">
					{location}
				</Typography>
				{/* <Avatar alt="SB" /> */}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
