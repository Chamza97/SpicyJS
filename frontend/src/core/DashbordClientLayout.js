import React from "react";
import Sidebar from "../components/ClientDashbord/Sidebar";
import Navbar from "../components/ClientDashbord/Navbar";
import Footer from "../components/ClientDashbord/Footer";

const DashbordClientLayout = ({ children }) => {
  return (
    <>
      <div className="wrapper ">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="content">
            <h1></h1>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default DashbordClientLayout;
