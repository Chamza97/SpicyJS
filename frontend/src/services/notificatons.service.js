import socketClient from "socket.io-client";
import { io } from "socket.io-client";
const {isAuth} = require("../auth/helpers");


export const SERVER = "http://127.0.0.1:8000";
export var socket = null;

export function apiGetNotifications() {
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${process.env.REACT_APP_API}/notifications/user/${encodeURIComponent(isAuth()._id)}`, requestOptions).then(handleResponse);
}
export function connectUser(userId){
    if(socket == null){
        if(userId){
            socket  = socketClient(SERVER, { transports: ['websocket'] ,auth : {userId : userId}})
        }else{
            socket  = socketClient(SERVER, { transports: ['websocket'] })
        }
    }
}
export function initSocket(){
    socket = socketClient(SERVER,{ transports: ['websocket'] });
}
export function setSocket(s){
    socket = s
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}