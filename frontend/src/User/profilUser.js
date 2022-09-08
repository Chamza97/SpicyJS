/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Dashbordadmin from "../core/DashbordClientLayout";
import {isAuth} from "../auth/helpers";
export default function test() {
    return (
     <Dashbordadmin>

        <div class="content">
             <div class="container-fluid">
             <div class="row">
             <div class="col-md-8">
             <div class="card">
    <div class="card-header card-header-primary">
    <h4 class="card-title">Edit Profile</h4>
        </div>
        <div class="card-body">
        <form>
        <div class="row">
        <div class="row">
  <div class="col-md-12">
 <div class="form-group">
 <label class="bmd-label-floating">Username</label>
 <input type="text" class="form-control"/>
 </div>
 </div>
 </div>
       </div> 

           < div class="row">
           <div class="col-md-12">
          <div class="form-group">
          <label class="bmd-label-floating">Description</label>
          <input type="text" class="form-control"/>
          </div>
          </div>
         </ div>
         <input type="file" filename="pubImage" />
     <div class="row">

 
 
     </div>






       <button type="submit" class="btn btn-primary pull-right">Update Profile</button>
       <div class="clearfix"></div>
        </form>
        </div>


        
        </div>
             </div>


             <div class="col-md-4">
             <div class="card card-profile">
             <div class="card-avatar">
   <a href="javascript">
     <img class="img" src="../assets/marc.jpg" />
   </a>
 </div>
 <div class="card-body">
      
      <h4 class="card-title">{isAuth().name}</h4>
      <h6 class="card-category text-gray">{isAuth().role}</h6>
      <p class="card-description">
      {isAuth().description}
      </p>
    
                
                 </div>

                 </div>
             </div>
             </div>
           </div> 
           </div>     


          
           </Dashbordadmin>
    )
}
