import React from "react";
import { isAuth, signout } from "../../auth/helpers";
import { useHistory } from "react-router-dom";
import Notifications from "../../containers/notification/notification.container";
import {initSocket, socket, userLogout} from "../../services/notificatons.service";

const Navbar = () => {
  let history = useHistory();
  return (
    <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
      <div className="container-fluid">
        <div className="navbar-wrapper">
          <a className="navbar-brand" href="javascript:;">
            Dashboard
          </a>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          aria-controls="navigation-index"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
          <span className="navbar-toggler-icon icon-bar"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end">
          <form className="navbar-form">
            <div className="input-group no-border">
              <input
                type="text"
                value=""
                className="form-control"
                placeholder="Search..."
              />
              <button
                type="submit"
                className="btn btn-white btn-round btn-just-icon"
              >
                <i className="material-icons">search</i>
                <div className="ripple-container"></div>
              </button>
            </div>
          </form>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="javascript:;">
                <i className="material-icons">dashboard</i>
                <p className="d-lg-none d-md-block">Stats</p>
              </a>
            </li>
            <Notifications/>
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="http://example.com"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="material-icons">notifications</i>
                <span className="notification">5</span>
                <p className="d-lg-none d-md-block">Some Actions</p>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href="#">
                  Mike John responded to your email
                </a>
                <a className="dropdown-item" href="#">
                  You have 5 new tasks
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link"
                href="javascript:;"
                id="navbarDropdownProfile"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="material-icons">person</i>
                <p className="d-lg-none d-md-block">Account</p>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownProfile"
              >
                <a className="dropdown-item" href="#">
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    console.log(isAuth())
                    if(socket == null) initSocket();
                    socket.emit('userDisconnected',isAuth()._id)
                    signout(() => {
                      history.push("/");
                    });
                  }}
                >
                  Log out
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
