import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
} from "@material-ui/core";
import React from "react";
import Navbar from "../../../components/Shared/Navbar/Navbar";
import ListIcon from "@material-ui/icons/List";
import "./Dashboard.css";
import clsx from "clsx";

const drawerWidth = 70;

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
	},

	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: drawerWidth,
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
}));

const Dashboard = () => {
	const classes = useStyles();
	return (
		<div className="dashboard">
			<Navbar location="Dashboard" />
			<Drawer
				variant="permanent"
				className="dashboard-drawer"
				classes={{
					paper: clsx(classes.drawerClose),
				}}
			>
				<div className={classes.toolbar}></div>
				<List>
					<ListItem button key="Tests">
						<ListItemIcon>
							<ListIcon />
						</ListItemIcon>
						<ListItemText primary={"Tests"} />
					</ListItem>
				</List>
			</Drawer>
		</div>
	);
};

export default Dashboard;
