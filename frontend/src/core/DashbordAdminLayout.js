import React from "react";
import Sidebar from "../components/AdminDashbord/Sidebar";
import Navbar from "../components/AdminDashbord/Navbar";
import Footer from "../components/AdminDashbord/Footer";

const DashbordAdminLayout = ({children}) => {
  return (
    <>
      <div className="wrapper ">
        <Sidebar />
        <div className="main-panel">
          <Navbar />
          <div className="content">
            
            {children}
            
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};
export default DashbordAdminLayout;
