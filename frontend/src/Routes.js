import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import Admin from "./core/Admin";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashbordadmin from "./core/DashbordAdminLayout";
import NotFound from "./components/NotFound/NotFound";
import DashbordClientLayout from "./core/DashbordClientLayout"
import Pub from "./components/Publicity/Pub";
import AddPub from "./components/Publicity/AddPub";
import EditPub from "./components/Publicity/EditPub";
import PubDetail from "./components/Publicity/PubDetail"
import payment from "./payement/Accueil"
import update from "./User/UpdateUser"
import ChatBot from "./components/Bot/NewBot"
import DashbordClient from "./components/ClientDashbord/DashbordClient"
import profiluseradmine from "./User/profiluseradmine"
import profilUser from "./User/profilUser"
import {ProductsPage} from "./containers/products.container/products.container";
import  {TrackedProductPage} from "./containers/index"
import {AdminAllProducstDetailsPage} from "./containers/AdminAllProductsDetailsPage/AdminAllProducstDetailsPage"
import  {TrackedProductsPage} from "./containers/TrackedProductsPage/TrackedProductsPage";
import userhistory from "./components/UserHistory/Userhistory"
import {ProductsHistoryPage} from "./containers/ProductsHistoryPage"
import  promotion from "./components/Publicity/promotionclient";
import  dashboardadmin from "./components/AdminDashbord/dasheboardadmin";
import update1 from "./User/adminprofil"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/auth/activate/:token" exact component={Activate} />
        <PrivateRoute path="/private" exact component={Private} />
        <PrivateRoute path="/profilUser" exact component={profilUser} />
        <PrivateRoute path="/promotion" exact component={promotion} />
        <PrivateRoute path="/payment" exact component={payment} />
        <PrivateRoute path="/updateuser/:id" exact component={update} />
        <PrivateRoute path="/dashboard" exact component={DashbordClient} />
        <PrivateRoute path="/chatbot" exact component={ChatBot} />
        <PrivateRoute path="/dashbordclient" exact component={DashbordClientLayout} />
        <AdminRoute path="/admin" exact component={Admin} />
        <AdminRoute exact path="/dashbordadmin/admin-all-products-details" component={AdminAllProducstDetailsPage} />
        <AdminRoute path="/dashbordadmin" exact component={Dashbordadmin} />
        <AdminRoute exact path="/pub" component={Pub} />
        <AdminRoute path="/profiluseradmine" exact component={profiluseradmine} />
        <AdminRoute exact path="/addpub" component={AddPub} />
        <AdminRoute exact path="/addpub" component={AddPub} />
        <AdminRoute exact path="/editpub/:id" component={EditPub} />
        <AdminRoute exact path="/pubdetail/:id" component= {PubDetail} />
        <PrivateRoute path="/tracked-products/product/:id" component= {TrackedProductPage} />
        <AdminRoute path="/dashboardadmin" component= {dashboardadmin} />
        <PrivateRoute path="/products" component= {ProductsPage} />
        <PrivateRoute path="/userhistory" component= {userhistory} />
        <PrivateRoute path="/showhistoryprod/:name/:brand/:price" component= {ProductsHistoryPage} />
        <PrivateRoute path="/tracked-products" component= {TrackedProductsPage} />
        <AdminRoute path="/updateuser1/:id" exact component={update1} />

        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
