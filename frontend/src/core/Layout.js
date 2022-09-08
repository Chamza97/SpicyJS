import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";
import {initSocket, socket, userLogout} from "../services/notificatons.service";

//match nesta3melha bech na3ref active route, wel match kima sta3melt'ha fel account activation lel url
const Layout = ({ children, match, history }) => {
  const isActive = (path) => {
    // if (match.path === path) {
    //   return { color: "#000" };
    // } else {
    //   return { color: "#fff" };
    // }
  };

  const nav = () => (
    <header id="header" className="fixed-top">
      <div class="container d-flex align-items-center justify-content-between">
        <div className="container d-flex align-items-center justify-content-between">
          <h1 className="logo">
            <a href="index.html">SpyciyJS</a>
          </h1>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <Link
                  to="/"
                  className="nav-link scrollto"
                  style={isActive("/")}
                >
                  Home
                </Link>
              </li>
              <li>
                <a className="nav-link scrollto " href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#team">
                  Team
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#pricing">
                  Pricing
                </a>
              </li>

              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
              <li></li>
              {!isAuth() && (
                <Fragment>
                  <li>
                    <Link
                      to="/signin"
                      className=" nav-link"
                      style={isActive("/signin")}
                    >
                      Signin
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      to="/signup"
                      className=" nav-link"
                      style={isActive("/signup")}
                    >
                      Signup
                    </Link>
                  </li>
                </Fragment>
              )}
              {isAuth() && (
                <li className="nav-item ">
                  <span className="nav-link">{isAuth().name} </span>
                </li>
              )}

              {isAuth() && (
                <li className="nav-item ">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer", color: "#fff" }}
                    onClick={() => {
                      if(socket == null) initSocket();
                      socket.emit('userDisconnected',isAuth()._id)
                      signout(() => {
                        history.push("/");
                      });
                    }}
                  >
                    Signout
                  </span>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
  return (
    <Fragment>
      {nav()}
      <div className="container">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
