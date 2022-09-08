import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import {Provider} from "react-redux";
import store from "./redux/Store"
ReactDOM.render(

  <React.StrictMode>
      <Provider store={store}>
            <Routes />
      </Provider>
  </React.StrictMode>
    ,
  document.getElementById("root")
);
