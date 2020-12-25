import React from "react";
import { Switch, Route } from "react-router-dom";
import ClubContextProvider from "../context/ClubContext";
import CreateTest from "../pages/club/CreateTest/CreateTest";
import Dashboard from "../pages/club/Dashboard/Dashboard";
import ClubSignin from "../pages/club/SignIn";
import SignUp from "../pages/club/SignUp";
import TestDetails from "../pages/club/TestDetails/TestDetails";
import DomainDetails from "../pages/club/DomainDetails/DomainDetails";
import ResultsTestDetails from "../pages/club/Results/ResultsTestDetails/ResultsTestDetails";
import ResultsTestDomains from '../pages/club/Results/ResultsTestDomains/ResultTestDomains'

const ClubRoutes = () => {
  return (
    <ClubContextProvider>
      <Switch>
        <Route exact path='/club/signin' component={ClubSignin} />
        {/* <Route exact path='/club/signup' component={SignUp} /> */}
        <Route exact path='/club/createTest' component={CreateTest} />
        <Route exact path='/club/dashboard' component={Dashboard} />
        <Route exact path='/club/test/:id' component={TestDetails} />
        <Route
          exact
          path='/club/Results/test/:id'
          component={ResultsTestDetails}
        />
        <Route
          exact
          path='/club/test/:id/:domainId'
          component={DomainDetails}
        />
        <Route
          exact
          path='/club/Results/test/:id/:domainId'
          component={ResultsTestDomains}
        />
      </Switch>
    </ClubContextProvider>
  );
};

export default ClubRoutes;
