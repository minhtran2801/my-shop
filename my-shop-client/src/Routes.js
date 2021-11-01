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
import CreateProduct from "./Components/Dashboard/Admin/CreateProduct";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/*GENERAL ROUTES*/}
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />

        {/*CUSTOMER ROUTES*/}
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

        {/*ADMIN ROUTES*/}
        <AdminRoute path="/admin/account" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/category/create"
          exact
          component={CreateCategory}
        />
        <AdminRoute
          path="/admin/product/create"
          exact
          component={CreateProduct}
        />

        {/*ERROR ROUTES*/}
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
