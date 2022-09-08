/* eslint-disable jsx-a11y/alt-text */
import React  , { useState, useEffect }from 'react'
import Dashbordadmin from "../core/DashbordClientLayout";
import axios from "axios";
import {isAuth} from "../auth/helpers";
import { useHistory, useParams } from "react-router-dom";
const  completeprofil = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let history = useHistory();
// eslint-disable-next-line react-hooks/rules-of-hooks
     const { id } = useParams();
// eslint-disable-next-line react-hooks/rules-of-hooks
    const [description, setdescription] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [fileName, setFileName] = useState("");
const onChangeFile = (e) => {
  setFileName(e.target.files[0]);
};

const changeOnclick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", fileName);
    axios.put(`http://localhost:8000/profil/updateuser/${id}`, formData);
    history.push("/dashbordadmin");
};
    return (
     <Dashbordadmin>

        <div class="content">
             <div class="container-fluid">
             <div class="row">
             <div class="col-md-8">
             <div class="card">
    <div class="card-header card-header-primary">
    <h4 class="card-title">Edit Profile</h4>
    <h5 class="card-title">Complete your profile</h5>
        </div>
        <div class="card-body">
        <form onSubmit={changeOnclick}>
        <div class="row">
        <div class="row">

 </div>
       </div> 

           < div class="row">
           <div class="col-md-12">
          <div class="form-group">
          <label class="bmd-label-floating">Description</label>
          <input type="text" 
          class="form-control"
          name="description"
        
          onChange={(e) => setdescription(e.target.value)}
          />
          </div>
          </div>
         </ div>
         <input type="file" filename="photo" onChange={onChangeFile}/>
     <div class="row">

 
 
     </div>
       <button type="submit" class="btn btn-primary pull-right">Update Profile</button>
       <div class="clearfix"></div>
        </form>
        </div>     
        </div>
             </div>






             </div>
           </div> 
           </div>     


          
           </Dashbordadmin>
    )
}
export default completeprofil;