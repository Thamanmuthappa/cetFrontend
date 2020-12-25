import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
	typography: {
		fontFamily: "Source Sans Pro",
	},
	palette: {
		primary: {
			main: "#E45044",
		},
		secondary: {
			main: "#E45044",
		},
		whitetext: {
			main: "#fafafa",
		},
		pureWhite: {
			main: "#FFFFFF",
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);