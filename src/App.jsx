import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Mobile from "./pages/Mobile";
import ErrorPage from "./pages/ErrorPage";
import StudentRoutes from "./routes/StudentRoutes";
import ClubRoutes from "./routes/ClubRoutes";
import { Breakpoint, BreakpointProvider } from "react-socks";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import OrgProfile from "./pages/ClubProfile";
import CCProfile from "./pages/CCProfile";

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#1799E1",
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    }
  });

function App() {
    return (
        <ThemeProvider theme={theme}>
        <div className="App">
            <BreakpointProvider>
                <Breakpoint medium down>
                    <Mobile/>
                </Breakpoint>
                <Breakpoint large up>
                    <Router>
                        <Switch>
                            <Route exact path="/"
                                component={Landing}/>
                            <Route path="/student"
                                component={StudentRoutes}/>
                            <Route path="/club"
                                component={ClubRoutes}/>
                            <Route path="/us/codechefvit"
                                component={CCProfile}/>
                            <Route path="/org/:username"
                                component={OrgProfile}/>
                            <Route component={ErrorPage}/>
                        </Switch>
                    </Router>
                </Breakpoint>
            </BreakpointProvider>
        </div>
        </ThemeProvider>
    );
}

// console.clear();

export default App;
