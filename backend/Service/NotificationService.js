import notification from "../models/notification";
import User from "../models/user";
var mongoose = require('mongoose');
const fetch = require("node-fetch");

module.exports = {
   
    getById,
    create,
    deleteNotification,
    getNotificationByUser,
    DeleteNotificationByUser,
    sendNotif,
};

//getById
async function getById(id) {
    return notification.findById(id);
}
//Create
async function create(notificationParam) {
    console.log("praps",notificationParam)
    const notif = new notification(notificationParam);
    await notif.save();
}
//Delete
async function deleteNotification(id) {
    await notification.findByIdAndRemove(id);
}
//getNotifByID
export async function getNotificationByUser(id) {
    return notification.find({User_id: id});
}
export async function getAdminUsers(){
    return User.find({role : "admin"})
}
export async function checkIfAdmin(id){
    return User.findOne({_id : id}).then(user =>{
        return user != null && user.role === "admin";
    })
}


//DeleteByUserId
async function  DeleteNotificationByUser(id) {
    return notification.deleteMany({User_id : id});
}

async function sendNotif() {
    let response = await fetch('https://ptsv2.com/t/i9qzr-1617619418/post')
    let text = await response.text();
}

