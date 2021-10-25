import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { signUpUser } from "../../auth";

const Signup = () => {
  const [values, setValues] = useState({
    f_name: "",
    l_name: "",
    password: "",
    confirm_password: "",
    email: "",
    f_name_error: "",
    l_name_error: "",
    password_error: "",
    email_error: "",
    success: false,
  });

  const {
    f_name,
    l_name,
    email,
    password,
    confirm_password,
    f_name_error,
    l_name_error,
    email_error,
    password_error,
    success,
  } = values;

  const handleChange = (element_name) => (event) => {
    setValues({ ...values, [element_name]: event.target.value });
  };

  const emptyAllFields = () => {
    setValues({
      ...values,
      f_name: "",
      l_name: "",
      email: "",
      password: "",
      f_name_error: "",
      l_name_error: "",
      email_error: "",
      password_error: "",
      confirm_password: "",
      success: true,
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("F", values);
    signUpUser({
      f_name: f_name,
      l_name: l_name,
      email: email,
      password: password,
      confirm_password: confirm_password,
    }).then((data) => {
      console.log(data);
      if (data.errors) {
        setValues({
          ...values,
          f_name_error: data.f_name,
          l_name_error: data.l_name,
          email_error: data.email,
          password_error: data.password,
          email: data.email.length > 0 ? "" : email,
          password: data.password.length > 0 ? "" : "",
          confirm_password: data.password.length > 0 ? "" : "",
          success: false,
        });
      } else {
        emptyAllFields();
      }
    });
  };

  const signUpForm = () => (
    <section className="vh-100 bg-image">
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form>
                    <div className="form-outline mb-4">
                      <label
                        htmlFor="inputFirstName"
                        className={`form-label ${
                          f_name_error.length > 0 ? "invalidText" : "validText"
                        }`}
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-lg ${
                          f_name_error.length > 0
                            ? "invalidBorder"
                            : "validBorder"
                        }`}
                        id="inputFirstName"
                        placeholder="First name"
                        value={f_name}
                        onChange={handleChange("f_name")}
                      />
                      {f_name_error.length > 0 && (
                        <span className="invalidText">{f_name_error}</span>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <label
                        htmlFor="inputLastName"
                        className={`form-label ${
                          l_name_error.length > 0 ? "invalidText" : "validText"
                        }`}
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        className={`form-control form-control-lg ${
                          l_name_error.length > 0
                            ? "invalidBorder"
                            : "validBorder"
                        }`}
                        id="inputLastName"
                        placeholder="Last name"
                        value={l_name}
                        onChange={handleChange("l_name")}
                      />
                      {f_name_error.length > 0 && (
                        <span className="invalidText">{f_name_error}</span>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <label
                        htmlFor="inputEmail"
                        className={`form-label ${
                          email_error.length > 0 ? "invalidText" : "validText"
                        }`}
                      >
                        Email address
                      </label>
                      <input
                        type="email"
                        className={`form-control form-control-lg ${
                          email_error.length > 0
                            ? "invalidBorder"
                            : "validBorder"
                        }`}
                        id="inputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleChange("email")}
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                      </div>
                      {email_error.length > 0 && (
                        <span className="invalidText">{email_error}</span>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <label
                        htmlFor="inputPassword"
                        className={`form-label ${
                          password_error.length > 0
                            ? "invalidText"
                            : "validText"
                        }`}
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        className={`form-control form-control-lg ${
                          password_error.length > 0
                            ? "invalidBorder"
                            : "validBorder"
                        }`}
                        id="inputPassword"
                        aria-describedby="passwordHelp"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleChange("password")}
                      />
                      <div
                        id="passwordHelp"
                        className={`form-text ${
                          password_error.length > 0 ? "d-none" : "d-inline"
                        }`}
                      >
                        Your password needs: <br />
                        • Minimum 6 and maximum 20 characters
                        <br />
                        • At least 1 UPPERCASE english letter
                        <br />
                        • At least 1 lowercase english letter
                        <br />• At least 1 number
                      </div>
                      {password_error.length > 0 && (
                        <span className="invalidText">{password_error}</span>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <label
                        htmlFor="inputPasswordConfirmation"
                        className={`form-label ${
                          password_error.length > 0
                            ? "invalidText"
                            : "validText"
                        }`}
                      >
                        Confirm password
                      </label>
                      <input
                        type="password"
                        className={`form-control form-control-lg ${
                          password_error.length > 0
                            ? "invalidBorder"
                            : "validBorder"
                        }`}
                        id="inputPasswordConfirmation"
                        placeholder="Confirm password"
                        value={confirm_password}
                        onChange={handleChange("confirm_password")}
                      />
                      {password_error.length > 0 && (
                        <span className="invalidText">{password_error}</span>
                      )}
                    </div>

                    <div className="d-grid gap-2 col-6 mx-auto">
                      <button
                        onClick={clickSubmit}
                        type="button"
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body w-100"
                      >
                        Sign up
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <a href="/signin" className="fw-bold text-body">
                        <u>Login here</u>
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Account is created successfully. Please <Link to="/signin">Sign In</Link>.
    </div>
  );

  return (
    <Layout>
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
