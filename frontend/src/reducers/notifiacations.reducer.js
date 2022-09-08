import {notificationsConstants} from "../constants/notification.constants";


const initState = {
    isLoading: true,
    notifications:  [],
    error: '',
};
function notificationsReducer(state = initState, action) {
    switch (action.type) {
        case notificationsConstants.LOAD_NOTIFICATIONS:
            return {
                isLoading: true,
            };
        case notificationsConstants.LOAD_NOTIFICATIONS_SUCCESS :
            if( state.notifications.length === 0){
                return {
                    isLoading: false,
                    notifications: action.payload,
                    error: '',
                };
            }else{
                const oldNotifications = [...state.notifications]
                action.payload[0].forEach(notification => {
                    if(oldNotifications.indexOf(notification))
                    oldNotifications.push(notification)
                })
                const notifs = oldNotifications.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i)

                console.log(notifs)
                return {
                    isLoading: false,
                    notifications: notifs,
                    error: '',
                };
            }

        case notificationsConstants.LOAD_NOTIFICATIONS_FAIL:
            return {
                isLoading: false,
                notifications: [],
                error: action.payload,
            };
        default:
            return state;
    }
}
export default notificationsReducer;