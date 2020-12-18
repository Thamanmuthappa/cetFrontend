import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Mobile from "./pages/Mobile";
import ErrorPage from "./pages/ErrorPage";
import StudentRoutes from "./routes/StudentRoutes";
import ClubRoutes from "./routes/ClubRoutes";
import { Breakpoint, BreakpointProvider } from 'react-socks';

function App() {
	return (
		<div className="App">
		<BreakpointProvider>
          <Breakpoint large down>
            <Mobile />
          </Breakpoint>
          <Breakpoint xlarge up>
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route path="/student" component={StudentRoutes} />
					<Route path="/club" component={ClubRoutes} />
					<Route path="*" component={ErrorPage} />
				</Switch>
			</Router>
			</Breakpoint>
		</BreakpointProvider>
		</div>
	);
}

export default App;
