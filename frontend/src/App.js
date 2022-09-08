import React from "react";
import LandingPage from "./views/LandinPage";
import {Provider} from "react-redux";
import store from "./redux/Store"
import socketClient from "socket.io-client";
import {useDispatch} from "react-redux";
import {connectUser, socket} from "./services/notificatons.service";
import {isAuth} from "./auth/helpers";
import {loadApiNotificationsSuccess} from "./actions/notifications.action";

const App = () => {

    const uDispatch = useDispatch()
    connectUser(isAuth()._id)
    console.log('apps')
    socket.on('resNotifications', (...args) => {
        console.log(args)
        uDispatch(loadApiNotificationsSuccess(args))
    });
  return (
    <>
        <div >
            <LandingPage />
        </div>
    </>
  );
};

export default App;
