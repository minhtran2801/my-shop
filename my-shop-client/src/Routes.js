import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Signin from "./Components/Auth/Signin";
import Home from "./Components/Homepage/Home";

import CustomerDashboard from "./Components/Dashboard/Customer/Dashboard";
import DashboardOrder from "./Components/Dashboard/Customer/OrderHistory";
import EditProfile from "./Components/Dashboard/Customer/EditProfile";
import ChangePassword from "./Components/Dashboard/Customer/ChangePassword";
import AddressBook from "./Components/Dashboard/Customer/AddressBook";

import AdminDashboard from "./Components/Dashboard/Admin/Dashboard";
import CreateCategory from "./Components/Dashboard/Admin/CreateCategory";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute
          path="/customer/account"
          exact
          component={CustomerDashboard}
        />
        <PrivateRoute
          path="/customer/order/history"
          exact
          component={DashboardOrder}
        />
        <PrivateRoute
          path="/customer/profile/update"
          exact
          component={EditProfile}
        />
        <PrivateRoute
          path="/customer/password/update"
          exact
          component={ChangePassword}
        />
        <PrivateRoute path="/customer/address" exact component={AddressBook} />
        <AdminRoute path="/admin/account" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={CreateCategory} />
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
