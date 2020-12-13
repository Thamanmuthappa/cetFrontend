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

const ClubSidebar = ({ setSelectedTab }) => {
	const classes = useStyles();
	return (
		<Drawer
			variant="permanent"
			className="dashboard-drawer"
			classes={{
				paper: clsx(classes.drawerClose),
			}}
		>
			<div className={classes.toolbar}></div>
			<List>
				<Tooltip title="Tests" placement="right" arrow>
					<ListItem button onClick={() => setSelectedTab(0)}>
						<ListItemIcon>
							<ListIcon fontSize="large" />
						</ListItemIcon>
						<ListItemText primary={"Tests"} />
					</ListItem>
				</Tooltip>
				<Divider />
				<Tooltip title="Results" placement="right" arrow>
					<ListItem button onClick={() => setSelectedTab(1)}>
						<ListItemIcon>
							<Book fontSize="large" />
						</ListItemIcon>
						<ListItemText primary={"Results"} />
					</ListItem>
				</Tooltip>
				<Divider />
				<Tooltip title="Profile" placement="right" arrow>
					<ListItem button onClick={() => setSelectedTab(2)}>
						<ListItemIcon>
							<Person fontSize="large" />
						</ListItemIcon>
						<ListItemText primary={"Profile"} />
					</ListItem>
				</Tooltip>
				<Divider />
			</List>
		</Drawer>
	);
};

export default ClubSidebar;
