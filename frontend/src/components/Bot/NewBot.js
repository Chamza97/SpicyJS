import React from "react";
import axios from "axios";
import DashbordClient from "../../core/DashbordClientLayout";
import { ProductsPage } from "../../containers/products.container/products.container";
import Bulldiscussion from "./Bulldiscussion";
import "./bot.css";

class NewBot extends React.Component {


  render() {
    return (
      <DashbordClient>
        <ProductsPage/>
        <Bulldiscussion/>
      </DashbordClient>
    );
  }
}
export default NewBot;
