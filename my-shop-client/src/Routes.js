import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./Components/Navbar/Signup";
import Signin from "./Components/Navbar/Signin";
import Home from "./Components/Homepage/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
