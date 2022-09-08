import {trackedProductConstants} from "../constants/show.tracked.produts.constants";
import {getTrackedProducts, postUntrackProduct} from "../services/product.service";

import {productConstants} from "../constants/products.contants";

export const loadApiTrackedPoducts = () => {
    return {
        type: trackedProductConstants.LOAD_TRACKED_PRODUCTS,
    };
};
export const loadApiTrackedPoductsSuccess = products => {
    return {
        type: trackedProductConstants.LOAD_TRACKED_PRODUCTS_SUCCESS,
        payload: products,
    };
};
export const loadApiTrackedPoductstFail = error => {
    return {
        type: trackedProductConstants.LOAD_TRACKED_PRODUCTS_FAIL,
        payload: error,
    };
};
export const getProducts = (offset) => {
    return dispatch => {
        dispatch(loadApiTrackedPoducts);
        getTrackedProducts(offset)
            .then(resp => {
                dispatch(loadApiTrackedPoductsSuccess(resp));
            })
            .catch(error => {
                dispatch(loadApiTrackedPoductstFail(error));
            });
    };
};
export const untrackPoductstSuccess = products => {
    return {
        type: trackedProductConstants.LOAD_TRACKED_PRODUCTS_UNTRACK_PRODUCT_SUCCESS,
        payload: products,
    };
};
export const untrackProduct = (productId) => {
    return dispatch => {
        dispatch(loadApiTrackedPoducts);
        postUntrackProduct(productId)
            .then(resp => {
                dispatch( untrackPoductstSuccess(resp));
            })

    };
};



