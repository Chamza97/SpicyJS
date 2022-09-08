import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../../auth/helpers";

import { useHistory } from "react-router-dom";
import {initSocket, socket} from "../../services/notificatons.service";

const Header = () => {
  let history = useHistory();
  return (
    <header id="header" className="fixed-top">
      <div class="container d-flex align-items-center justify-content-between">
        <div className="container d-flex align-items-center justify-content-between">
          <div style={{display:"flex"}}>

            <img src="assets/img/logosp.png" style={{height : "75px" , paddingRight:"15px", paddingLeft : "-20px;"}} />
          <h1 className="logo" style={{paddingTop:"20px"}}>
            <Link to="/">
              SpyciyJS
            </Link>
          </h1>
          </div>
        

          <nav id="navbar" className="navbar">
            <ul>
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
                    <Link to="/signin" className=" nav-link">
                      Signin
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link to="/signup" className=" nav-link">
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
                <li
                  className="nav-item "
                  style={{
                    paddingRight: "10 px 50px !important",
                    marginRight: "50px !important ",
                  }}
                >
                  <span
                    className="nav-link"
                    style={{
                      cursor: "pointer",
                      color: "black",
                      paddingRight: "10px 50px !important",
                      marginRight: "10px 50px !important",
                    }}
                    onClick={() => {
                      if(socket == null) initSocket();
                      socket.emit('userDisconnected', isAuth()._id);
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
};
export default Header;
