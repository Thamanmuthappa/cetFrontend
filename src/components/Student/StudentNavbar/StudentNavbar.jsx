import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { StudentContext } from "../../../context/StudentContext";

const StudentNavbar = ({ location }) => {
	const history = useHistory();

	const { setLoginFalse } = useContext(StudentContext);

	const handleLogout = () => {
		setLoginFalse();

		history.push("/student/signin");
	};

	return (
		<AppBar
			className="navbar"
			style={{
				backgroundColor: "#081220",
				zIndex: "1400",

				position: "relative",
				borderBottom: "1px solid #F5F5F540",
			}}
			elevation={2}
		>
			<Toolbar>
				<Link to={`/student/dashboard`}>
					<img
						src="/assets/Group2.png"
						alt="logo"
						className="nav-img"
						style={{width:"80%"}}
					/>
				</Link>
				<Typography
					variant="h5"
					className="nav-brand"
					style={{ flex: 1 , marginLeft:"24px"}}
				>
					{location}
				</Typography>
				{/* <Avatar alt="SB" /> */}
				<Button
					variant="contained"
					color="primary"
					style={{ marginRight: "20px", fontWeight: "bold" }}
					component={Link}
					to="/student/profile"
				>
					Profile
				</Button>
				<Button className="logout-btn-nav" onClick={handleLogout}>
					LogOut
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default StudentNavbar;
