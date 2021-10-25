import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#FFFFFF",
    };
  } else {
    return {
      color: "#B0AEAE",
    };
  }
};

const Menu = ({ history }) => (
  <div className="sticky-top bg-dark">
    <div className="container nav-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            alt="shop logo"
            width="50"
            height="50"
            className="d-inline-block align-center"
          />
        </a>
        <div className="container nav-searchBar">
          <form className="form-inline w-100">
            <div className="input-icons">
              <i className="fa fa-search icon"></i>
              <input
                className="form-control mr-sm-2 input-field"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          </form>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#toggleMobileMenu"
          aria-controls="toggleMobileMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="toggleMobileMenu">
          <ul className="navbar-nav flex-row flex-wrap   ms-md-auto text-center justify-content-center align-items-center">
            <li className="nav-item col-5 col-md-auto active">
              <Link
                className="nav-link p-2"
                style={isActive(history, "/")}
                to="/"
              >
                Home<span className="sr-only">(current)</span>
              </Link>
            </li>

            <li className="nav-item col-5 col-md-auto ">
              <Link
                className="nav-link p-2"
                style={isActive(history, "/about")}
                to="/"
              >
                About
              </Link>
            </li>

            <li className="nav-item col-5 col-md-auto ">
              <Link
                className="nav-link p-2"
                style={isActive(history, "/products")}
                to="/products"
              >
                Shop
              </Link>
            </li>

            <li className="nav-item col-5 col-md-auto ">
              <Link
                className="nav-link p-2"
                style={isActive(history, "/contact")}
                to="/contact"
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item col-5 col-md-auto ">
              <Link className="nav-link p-2" to="/signin">
                <div>
                  <i
                    className="fas fa-user nav-icons"
                    style={isActive(history, "/signin")}
                  ></i>
                </div>
              </Link>
            </li>
            <li className="nav-item col-5 col-md-auto ">
              <Link className="nav-link p-2" to="/cart">
                <div>
                  <i
                    className="fas fa-shopping-cart nav-icons"
                    style={isActive(history, "/cart")}
                  ></i>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
);

export default withRouter(Menu);
