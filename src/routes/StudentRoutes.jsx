import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudentContextProvider from "../context/StudentContext";
import StudentSignIn from "../pages/Student/Signin";
import StudentOAuth from "../pages/Student/StudentOAuth";
import TestScreen from "../pages/Student/TestScreen/TestScreen";
import Dashboard from "../pages/Student/AllDomains/AllDomains";
import StudProfile from "../pages/Student/StudProfile/StudProfile";
import ClubTestsList from "../pages/Student/ClubTestsList/ClubTestsList";
import GetTestDomains from "../pages/Student/GetTestDomains/GetTestDomains";
import ErrorPage from "../pages/ErrorPage";

const StudentRoutes = () => {
    return (
        <StudentContextProvider>
            <Switch>
                <Route exact path="/student/profile"
                    component={StudProfile}/>
                <Route exact path="/student/club/:clubId"
                    component={ClubTestsList}/>
                <Route exact path="/student/test/domains/:testId"
                    component={GetTestDomains}/>
                <Route exact path="/student/test/:testId/:domainId"
                    component={TestScreen}/>
                <Route path="/student/dashboard"
                    component={Dashboard}/>
                <Route exact path="/student/signin"
                    component={StudentSignIn}/>
                <Route exact path="/student/oauth/:token/:loginCount"
                    component={StudentOAuth}/>
                <Route component={ErrorPage}/>
            </Switch>
        </StudentContextProvider>
    );
};

export default StudentRoutes;
