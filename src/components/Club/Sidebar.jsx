import React from "react";
import {
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Tooltip,
} from "@material-ui/core";
import clsx from "clsx";
import { Book, Person } from "@material-ui/icons";
import ListIcon from "@material-ui/icons/List";

const drawerWidth = 90;

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

const ClubSidebar = ({ setSelectedTab }) => {
	const classes = useStyles();
	return (
		<Drawer
			variant="permanent"
			className="dashboard-drawer"
			classes={{
				paper: clsx(classes.drawerClose),
			}}
			style={{background: "#171717"}}
		>
			<div className={classes.toolbar}></div>
			<List>
				<Tooltip title="Tests" placement="right" arrow>
					<ListItem
						button
						onClick={() => setSelectedTab(0)}
						className="sidebar-item"
					>
						<ListItemIcon style={{ alignItems: "center", alignContent:"center", justifyContent: "center"}}> 
							<ListIcon fontSize="large" style={{fill: "white", alignItems: "center", alignContent:"center", justifyContent: "center"}}/>
						</ListItemIcon>
						{/* <ListItemText primary={"Tests"} /> */}
					</ListItem>
				</Tooltip>
				<Divider style={{background:"#F5F5F540"}}/>
				<Tooltip title="Results" placement="right" arrow>
					<ListItem
						button
						onClick={() => setSelectedTab(1)}
						className="sidebar-item"
					>
						<ListItemIcon style={{alignItems: "center", alignContent:"center", justifyContent: "center"}}>
							<Book fontSize="large" style={{fill: "white"}}/>
						</ListItemIcon>
						{/* <ListItemText primary={"Results"} /> */}
					</ListItem>
				</Tooltip>
				<Divider style={{background:"#F5F5F540"}}/>
				<Tooltip title="Profile" placement="right" arrow>
					<ListItem
						button
						onClick={() => setSelectedTab(2)}
						className="sidebar-item"
					>
						<ListItemIcon style={{alignItems: "center", alignContent:"center", justifyContent: "center"}}>
							<Person fontSize="large" style={{fill: "white"}} />
						</ListItemIcon>
						{/* <ListItemText primary={"Profile"} /> */}
					</ListItem>
				</Tooltip>
				<Divider style={{background:"#F5F5F540"}}/>
			</List>
		</Drawer>
	);
};

export default ClubSidebar;
