import React, {useEffect ,useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getNotifications} from "../../actions/notifications.action";
import {isAuth} from "../../auth/helpers";
import socketClient  from "socket.io-client";
import {socket} from '../../services/notificatons.service'
import { Button, Overlay , Popover} from 'react-bootstrap';

const Notifications = ()=>{




    const uDispatch = useDispatch();

    useEffect(() => {

    }, [uDispatch]);

    const notificationsResult = useSelector(state => state.notificationsReducer);
     function getNotification(event){
         setShow(!show);
         setTarget(event.target);
         uDispatch(getNotifications())
     }
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);

    return (
        <>
            <>
                <div ref={ref}>
                    <Button className="nav-link" onClick = {getNotification}><span className="notification"></span></Button>
                    <Overlay
                        show={show}
                        target={target}
                        placement="bottom"
                        container={ref.current}
                        containerPadding={20}
                    >
                        <Popover id="popover-contained">
                            <Popover.Title as="h3">Notifications</Popover.Title>
                            <Popover.Content>
                                <ul>
                                    {
                                        notificationsResult.notifications &&  notificationsResult.notifications.map((item,index) => {
                                            return <>
                                                <a className="" href="#">
                                                    {item.titre} <br/>
                                                    <span>
                                                    {item.description}
                                                    </span>
                                                </a>
                                                </>
                                        })
                                    }
                                </ul>

                            </Popover.Content>
                        </Popover>
                    </Overlay>
                </div>
            </>

        </>
    )
}
export default Notifications;