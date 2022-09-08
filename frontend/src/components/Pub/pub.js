import React from "react";
import Dashbordadmin from "../../core/DashbordAdminLayout";

const Pub = () => {
  const Body = () => {
    return <h1>test for pub</h1>;
  };

  return <Dashbordadmin>
      <Body />
  </Dashbordadmin>;
};
export default Pub;
