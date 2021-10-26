import React, { useState } from "react";
import AuthLayout from "../Layout/AuthLayout";
import { signInUser } from "../../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error, success } = values;

  const handleChange = (element_name) => (event) => {
    setValues({ ...values, [element_name]: event.target.value });
  };

  const emptyAllFields = () => {
    console.log("SUCCESS");
    setValues({
      ...values,
      email: "",
      password: "",
      error: "",
      success: true,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("F", values);
    signInUser({
      email: email,
      password: password,
    }).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
        });
      } else {
        emptyAllFields();
      }
    });
  };

  const signInForm = () => (
    <section>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Login</h2>

              <form>
                <div className="form-outline mb-4">
                  <label
                    htmlFor="inputEmail"
                    className={`form-label ${
                      error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${
                      error.length > 0 ? "invalidBorder" : "validBorder"
                    }`}
                    id="inputEmail"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleChange("email")}
                  />
                </div>
                <div className="form-outline mb-4">
                  <label
                    htmlFor="inputPassword"
                    className={`form-label ${
                      error.length > 0 ? "invalidText" : "validText"
                    }`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control form-control-lg ${
                      error.length > 0 ? "invalidBorder" : "validBorder"
                    }`}
                    id="inputPassword"
                    aria-describedby="passwordHelp"
                    placeholder="Enter password"
                    value={password}
                    onChange={handleChange("password")}
                  />

                  {error.length > 0 && (
                    <span className="invalidText">{error}</span>
                  )}
                </div>

                <div className="d-grid gap-2 col-6 mx-auto w-100">
                  <button
                    onClick={clickSubmit}
                    type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100"
                  >
                    Sign up
                  </button>
                </div>

                <p className="text-center text-muted mt-5">
                  <a href="/signin" className="text-primary anchor-link">
                    Forgot your password?
                  </a>
                </p>
                <p className="text-center text-muted">
                  Create a new account?{" "}
                  <a href="/signup" className="text-primary anchor-link">
                    Sign up!
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return <AuthLayout>{signInForm()}</AuthLayout>;
};
export default Signin;
