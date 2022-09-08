import {productConstants} from "../constants/products.contants";

import {apiGetAdminProducts, apiGetProducts,postTrackProduct,postUntrackProduct} from "../services/product.service";


export const loadApiPoducts = () => {
    return {
        type: productConstants.LOAD_PRODUCTS,
    };
};
export const loadApiPoductsSuccess = products => {
    return {
        type: productConstants.LOAD_PRODUCTS_SUCCESS,
        payload: products,
    };
};
export const loadApiPoductstFail = error => {
    return {
        type: productConstants.LOAD_PRODUCTS_FAIL,
        payload: error,
    };
};
export const trackPoductstSuccess = products => {
    return {
        type: productConstants.TRACK_PRODUCT_SUCCESS,
        payload: products,
    };
};
export const untrackPoductstSuccess = products => {
    return {
        type: productConstants.UNTRACK_PRODUCT_SUCCESS,
        payload: products,
    };
};
export const getProducts = (name,brand,price) => {
    return dispatch => {
        dispatch(loadApiPoducts);
        apiGetProducts(name,brand,price)
            .then(resp => {
                dispatch(loadApiPoductsSuccess(resp));
            })
            .catch(error => {
                dispatch(loadApiPoductstFail(error));
            });
    };
};
export const getAdminProducts = () => {
    return dispatch => {
        dispatch(loadApiPoducts);
        apiGetAdminProducts()
            .then(resp => {
                dispatch(loadApiPoductsSuccess(resp));
            })
            .catch(error => {
                dispatch(loadApiPoductstFail(error));
            });
    };
};

export const trackProduct = (productId) => {
    return dispatch => {
        postTrackProduct(productId)
            .then(resp => {
                dispatch(trackPoductstSuccess(resp));
            })
    };
};

export const untrackProduct = (productId) => {
    return dispatch => {
        postUntrackProduct(productId)
            .then(resp => {
                dispatch( untrackPoductstSuccess(resp));
            })

        };
};
