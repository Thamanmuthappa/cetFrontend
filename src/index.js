import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
	typography: {
		fontFamily: "Source Sans Pro",
	},
	palette: {
		primary: {
			main: "#1799E1",
		},
		secondary: {
			main: "#3E62DF",
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