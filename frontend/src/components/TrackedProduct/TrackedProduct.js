import React from "react";
import {NavLink} from "react-router-dom";
import {untrackProduct} from "../../actions/tracked.products.action";
import {useDispatch} from "react-redux";

const TrackedProduct = (props) => {
    const uDispatch = useDispatch();
    const handleOnClickUntrackButton = ()=> {
        uDispatch(untrackProduct(props.product._id))
    }
    return (
        <>
            <tr>
                <td>
                    <div className="img-container">
                        <img src={props.product.image} alt=""/>
                    </div>
                </td>
                <td style={{maxWidth:"300px"}} className="td-name">
                    <a style={{fontSize:"18px"}} href="#jacket">{props.product.name}</a>
                    <br/><small>{props.product.description.substring(0, 70)}...</small>
                </td>

                <td className="text-center">
                    {props.product.onStock ?
                        <span className="badge badge-pill badge-success">on stock</span> :
                        <span className="badge badge-pill badge-warning">out of stock</span>
                    }
                </td>
                <td className="td-number text-center">
                    <span className="price ">{props.product.price} DT</span>
                </td>
                <td className="td-actions">
                    <div className=" ml-auto">
                        <ul className=" list-group-horizontal">
                            <li className="list-group-item"> <button  style={{height: "50px",width: "100px"}} type="btn btn-info" rel="tooltip" title=""
                                                                     className="btn btn-danger"
                                                                     data-original-title="Saved to Wishlist"
                                                                     onClick={handleOnClickUntrackButton}
                            >
                                untrack
                            </button>
                                <NavLink  type="button" className="btn btn-info" to={'/tracked-products/product/' + props.product._id}>
                                    <button type="btn btn-info" rel="tooltip" title=""
                                            className="btn btn-info"
                                            data-original-title="Saved to Wishlist"
                                    >
                                        View Details
                                    </button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </>
    );
}
export default TrackedProduct;