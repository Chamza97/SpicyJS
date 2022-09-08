
import {notificationsConstants} from "../constants/notification.constants";
import {apiGetNotifications} from "../services/notificatons.service";

export const loadApiNotifications = () => {
    return {
        type: notificationsConstants.LOAD_NOTIFICATIONS,
    };
};
export const loadApiNotificationsSuccess = notifications => {
    return {
        type: notificationsConstants.LOAD_NOTIFICATIONS_SUCCESS,
        payload: notifications,
    };
};
export const loadApiNotificaationsFail = error => {
    return {
        type: notificationsConstants.LOAD_NOTIFICATIONS_FAIL,
        payload: error,
    };
};
export const getNotifications = () => {
    return dispatch => {
        dispatch(loadApiNotifications());
        apiGetNotifications()
            .then(resp => {
                dispatch(loadApiNotificationsSuccess(resp));
            })
            .catch(error => {
                dispatch(loadApiNotificaationsFail(error));
            });
    };
};
