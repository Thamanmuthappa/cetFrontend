import React from "react";
import { Switch, Route } from "react-router-dom";
import Temp from "../pages/Student/AllDomains/AllDomains";

const StudentRoutes = () => {
  return (
    <Switch>
      <Route path='/student/temp' component={Temp} />
      <Route exact path='/student/signin'>
        Hello Student signin
      </Route>
    </Switch>
  );
};

export default StudentRoutes;
