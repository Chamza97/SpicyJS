
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {untrackProduct,trackProduct} from "../../actions/products.actions";
import {NavLink} from "react-router-dom";

const Product = (props) => {
    const uDispatch = useDispatch();

     function handleTrack(product) {
         uDispatch(trackProduct(product._id))
    }
    function handleUntrack(product) {
        uDispatch(untrackProduct(product._id))
    }

    return (
        <>
            <div className="col-md-4 main-product">
                <div className="card card-product card-plain">
                    <div className="card-header card-header-image">
                        <NavLink activeClassName='is-active' to={'/tracked-products/product/' + props.product._id}>
                            <img src={props.product.image} alt=""/>
                        </NavLink>
                        <div className="colored-shadow"
                        ></div>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{props.product.name}</h4>
                        <p className="card-description">{props.product.description}</p>
                    </div>
                    <div className="card-footer">
                        <div className="price-container">
                            <span className="price price-new">{props.product.price} DT</span>
                        </div>
                        <div className="stats ml-auto">

                            { !props.product.trackedByThisUser &&
                                <>
                                    <button className="btn btn-rose btn-link btn-fab  btn-round pull-right"
                                            onClick={() => handleTrack(props.product)}>
                                        <i className="material-icons">favorite_border</i>
                                    </button>
                                </>
                            }
                            { props.product.trackedByThisUser &&
                            <button type="button" rel="tooltip" title=""  onClick={() => handleUntrack(props.product)} className="btn btn-just-icon btn-link btn-rose" data-original-title="Saved to Wishlist">
                                <i className="material-icons">favorite</i>
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Product;