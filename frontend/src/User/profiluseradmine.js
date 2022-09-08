import React , { useState, useEffect } from 'react'
import Dashbordadmin from "../core/DashbordAdminLayout";
import axios from "axios";
const test=() => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [User, setUser] = useState([]);
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {loadUser();}, []);
  const loadUser = async () => {
    const result = await axios.get("http://localhost:8000/profil/getuser");
    setUser(result.data.reverse());
  };

  return (
    <Dashbordadmin>
    <div class="content">
      <div class="container-fluid">
      <div class="row">
      <div class="col-md-12">
      <div class="card">
      <div class="card-header card-header-primary">
    <h4 class="card-title ">User List </h4>
    
  </div>
  <div class="card-body">
  <div class="table-responsive">
  <table class="table">
  <thead class=" text-primary">
   <th>
     Name
   </th>
   <th>
    Mail
   </th>
   <th>
    Role
   </th>
 </thead>
 <tbody>
  {User.map((user, index)=> (
 
 
 <tr>
   <td>
   {user.name}
   </td>
   <td>
   {user.email}
   </td>
  

   <td class="text-primary">
   {user.role}
   </td>
 </tr>
))}
   </tbody>
    </table>
    </div>
    </div>

      </div>

      </div>
        </div>
      </div>
      
    </div>
    </Dashbordadmin>
  )
}
export default  test;