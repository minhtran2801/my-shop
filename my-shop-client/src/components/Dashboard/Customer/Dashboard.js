import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../../api/userAuth";
import CustomerDashboardLayout from "../../Layout/CustomerDashboardLayout";

const CustomerDashboard = () => {
  const {
    user: { _id, f_name, l_name, email },
  } = isAuthenticated();

  const customerInfo = () => {
    return (
      <div className="d-block w-100">
        <div className="block-title">
          <p className="d-block align-items-center text-dark text-decoration-none">
            <strong className="ms-2">Account Information</strong>
          </p>
          <span>
            <hr />
          </span>
        </div>
        <div className="block-content row pb-0">
          <div className="box-contact col-lg ms-2">
            <div className="box-title">
              <h4 className="d-block align-items-center text-dark text-decoration-none ">
                <span>Contact Information</span>
              </h4>
            </div>
            <div className="box-content">
              <p className="mb-0">
                {`${f_name} ${l_name}`}
                <br />
                {email}
              </p>
            </div>
            <div className="box-actions">
              <Link
                className="box-action-edit text-decoration-none"
                to="/customer/profile/update"
              >
                Edit Profile
              </Link>

              <Link
                className="box-action-change text-decoration-none"
                to="/customer/password/update"
              >
                Change Password
              </Link>
            </div>
          </div>
          <div className="box-newsletter col-lg ms-2">
            <div className="box-title">
              <h4 className="d-block align-items-center text-dark text-decoration-none ">
                <span>Newsletter</span>
              </h4>
            </div>
            <div className="box-content">
              <p className="mb-0">You are subscribing to our Weekly Deals!</p>
            </div>
            <div className="box-actions">
              <Link
                className="box-action-unsubscribe text-decoration-none"
                to="/customer/newsletter"
              >
                Unsubscribe
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const billingAddress = () => {
    return (
      <div className="d-block w-100">
        <div className="block-title">
          <p className="d-block align-items-center text-dark text-decoration-none">
            <strong className="ms-2">Billing address</strong>
          </p>
          <span>
            <hr />
          </span>
        </div>
        <div className="block-content row pb-0">
          <div className="box-billing col-lg ms-2">
            <div className="box-title">
              <h4 className="d-block align-items-center text-dark text-decoration-none ">
                <span>Default Billing Address</span>
              </h4>
            </div>
            <div className="box-content">
              <p className="mb-0">
                Minh Tran <br />
                U17/92-96 Milton Street
                <br />
                Ashfield, New South Wales, 2131
                <br />
                Australia
              </p>
            </div>
            <div className="box-actions">
              <Link
                className="box-action-address text-decoration-none"
                to="/customer/address/update"
              >
                Edit Address
              </Link>
            </div>
          </div>
          <div className="box-shipping col-lg ms-2">
            <div className="box-title">
              <h4 className="d-block align-items-center text-dark text-decoration-none ">
                <span>Default Shipping Address</span>
              </h4>
            </div>
            <div className="box-content">
              <p className="mb-0">
                Minh Tran <br />
                U17/92-96 Milton Street
                <br />
                Ashfield, New South Wales, 2131
                <br />
                Australia
              </p>
            </div>
            <div className="box-actions">
              <Link
                className="box-action-address text-decoration-none"
                to="/customer/address/update"
              >
                Edit Address
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const myAccount = () => {
    return (
      <Fragment>
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-dark min-vh-100">
          <div className="w-100 fs-5 ">
            <div className="d-block align-items-center pb-3 pb-lg-2 pb-xl-2 text-dark text-decoration-none">
              <h1>
                <span className="ms-2">My Account</span>
              </h1>
            </div>
            <span>
              <hr className="bg-white" />
            </span>
          </div>
          {customerInfo()}
          <span>
            <hr className="bg-white" />
          </span>
          {billingAddress()}
        </div>
      </Fragment>
    );
  };

  return <CustomerDashboardLayout>{myAccount()}</CustomerDashboardLayout>;
};

export default CustomerDashboard;
