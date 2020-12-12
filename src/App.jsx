import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import ErrorPage from "./pages/ErrorPage";
import StudentRoutes from "./routes/StudentRoutes";
import ClubRoutes from "./routes/ClubRoutes";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/student" component={StudentRoutes} />
					<Route path="/club" component={ClubRoutes} />
					<Route path="*" component={ErrorPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
