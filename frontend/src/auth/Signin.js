import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { authenticate, isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Google from "./Google";
import {socket, SERVER, setSocket, initSocket} from "../services/notificatons.service";
import socketClient from "socket.io-client";

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: "hafed.hafed444@gmail.com",
    password: "123456789",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = (response) => {
    // save the response (user, token) local storage/cookie (user in storage and token in cookie coz its better for security)
    authenticate(response, () => {
      setValues({
        ...values,
        name: "",
        email: "",
        password: "",
        buttonText: "Submitted",
      });

      //toast.success(`Hey ${response.data.user.name}, Welcome back!`);
      isAuth() && isAuth().role === "admin"
        ? history.push("/dashbordadmin")
        : history.push("/dashbordclient");
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then( (response) => {
        console.log("SIGNIN SUCCESS", response);

        if (response.status < 400 && response.data && response.data.user){
            console.log(response.status , response.data)
            var userId = response.data.user._id
            if(socket == null)   initSocket()
            socket.disconnect()
            if (!userId) return;
            const sockt = socketClient(SERVER,{
                transports: ['websocket'],
                auth : { userId : response.data.user._id}
            })
            setSocket(sockt)
            sockt.emit('userConnected' );
        }
        // save the response (user, token) local storage/cookie (user in storage and token in cookie coz its better for security)
        authenticate(response, () => {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            buttonText: "Submitted",
          });
        });

        //toast.success(`Hey ${response.data.user.name}, Welcome back!`);
        isAuth() && isAuth().role === "admin"
          ? history.push("/dashbordadmin")
          : history.push("/dashbordclient");
      })
      .catch((error) => {
        console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  //here i'm using '()' and not '{}' cause if i'm returning a single element i dont need '{}'
  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          value={email}
          type="email"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          value={password}
          type="password"
          className="form-control"
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <div className="col-md-6 offset-md-3">
      {/* lezem n7ot toast element bech najem nactivi notifs fel view */}
      <ToastContainer />
      {isAuth() ? <Redirect to="/" /> : null}
      {/* {JSON.stringify({ name, email, password })} */}
      <h1 className="p-5 text-center">Signin</h1>
      <Google informParent={informParent} />
      {signinForm()}
    </div>
  );
};

export default Signin;
