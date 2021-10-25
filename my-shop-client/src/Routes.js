import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./components/navbar/Signup";
import Signin from "./components/navbar/Signin";
import Home from "./components/homepage/Home";
import Menu from "./components/navbar/Menu";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
