import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuth, signout } from "../../auth/helpers";
import {initSocket, socket, userLogout} from "../../services/notificatons.service";

const Sidebar = () => {
  let history = useHistory();
  return (
    <div
      className="sidebar"
      data-color="green"
      data-background-color="black"
      data-image="assets/img/sidebar-1.jpg"
    >
      <div className="logo">
        <a href="http://www.creative-tim.com" className="simple-text logo-normal">
        <img src="assets/img/logosp.png" style={{height : "50px" , paddingRight:"15px", paddingLeft : "-80px;" , marginLeft:"-50px"}} />
          <span style = {{paddingTop: "10px"}}>User space </span>
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className="nav-item active  ">
            <Link className="nav-link" to="/dashboard">
              <i className="material-icons">dashboard</i>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to={`/updateuser/id${isAuth()._id}`}>
              <i className="material-icons">person</i>
              <p>User Profile</p>
            </Link>
          </li>
          <li className="nav-item ">
            <a className="nav-link" href="/chatbot">
              <i className="material-icons">smart_toy</i>
              <p>Chat Bot</p>
            </a>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/tracked-products">
              <i className="material-icons">travel_explore</i>
              <p>tracking</p>
            </Link>
          </li>
          {  isAuth().role !== "premium" ? (
              <li className="nav-item ">
                <Link className="nav-link" to="/payment">
                  <i className="material-icons">travel_explore</i>
                  <p>payment</p>
                </Link>
              </li>
          ) : (
              <>
              </>
          )
          }


          <li className="nav-item ">
            <Link className="nav-link" to="/products">
              <i className="material-icons">inventory_2</i>
              <p>products</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/userhistory">
              <i className="material-icons">history</i>
              <p>History</p>
            </Link>
          </li>
          <li class="nav-item active-pro ">
            <a
              className="nav-link"
              onClick={() => {
                if(socket == null) initSocket();
                socket.emit('userDisconnected',isAuth()._id)
                signout(() => {
                  history.push("/");
                });
              }}
            >
              <i class="material-icons">logout</i>
              <p>Log out</p>
            </a>
          </li>
         
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
