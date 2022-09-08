import React from "react";
import { Link, useHistory } from "react-router-dom";
import { isAuth, signout } from "../../auth/helpers";
import {initSocket, socket, userLogin, userLogout} from "../../services/notificatons.service";

const Sidebar = () => {
  let history = useHistory();
  return (
    <div
      className="sidebar"
      data-color="danger"
      data-background-color="black"
      data-image="./assets/img/sidebar-1.jpg"
    >
      <div className="logo">
      
        <a
          href="http://www.creative-tim.com"
          className="simple-text logo-normal"
        >
          <img src="assets/img/logosp.png" style={{height : "50px" , paddingRight:"15px", paddingLeft : "-80px;" , marginLeft:"-50px"}} />
          SpyciyJs
        </a>
      </div>
      <div className="sidebar-wrapper">
        <ul className="nav">
          <li className="nav-item active  ">
            <Link className="nav-link" to="/dashboardadmin">
              <i className="material-icons">dashboard</i>
              <p>Dashboard</p>
            </Link>
          </li>
          <li className="nav-item ">
            <a className="nav-link" href={`/updateuser1/${isAuth()._id}`}>
              <i className="material-icons">person</i>
              <p>User Profile</p>
            </a>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/dashbordadmin/admin-all-products-details">
              <i className="material-icons">travel_explore</i>
              <p>Products Management</p>
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="nav-link" to="/pub">
              <i className="material-icons">campaign</i>
              <p>Ads Management</p>
            </Link>
          </li>
          <li className="nav-item ">
            <a className="nav-link" href="/profiluseradmine">
              <i className="material-icons">person</i>
              <p>Users Profile</p>
            </a>
          </li>
          <li className="nav-item active-pro ">
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
              <i className="material-icons">logout</i>
              <p>Log out</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
