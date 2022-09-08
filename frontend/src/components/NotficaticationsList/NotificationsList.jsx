import React from "react";



const NotificationsList = (props) => {


    return (
        <>
            <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdownMenuLink11"
            >
                {
                    props.notifications.map((item,index) => {
                        return <>
                            <a className="dropdown-item" href="#">
                                {item.titre}
                                <span>
                                    {item.description}
                                </span>
                            </a>
                            </>
                    })
                }
            </div>

        </>


    )
}
export default NotificationsList;