import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
			<GoogleReCaptchaProvider
				reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}
			>
				<App />
			</GoogleReCaptchaProvider>
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
