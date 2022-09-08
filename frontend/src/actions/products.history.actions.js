import {productsHistoryConstants} from "../constants/products.history.constants";

import { apiGetProducts} from "../services/product.service";


export const loadApiPoducts = () => {
    return {
        type: productsHistoryConstants.LOAD_PRODUCTS_HISTORY,
    };
};
export const loadApiPoductsSuccess = products => {
    return {
        type: productsHistoryConstants.LOAD_PRODUCTS_HISTORY_SUCCESS,
        payload: products,
    };
};
export const loadApiPoductstFail = error => {
    return {
        type: productsHistoryConstants.LOAD_PRODUCTS_HISTORY_FAIL,
        payload: error,
    };
};

export const getProductsHistory = (name,brand,price) => {
    
    return dispatch => {
        dispatch(loadApiPoducts);
        apiGetProducts(name,brand,price)
            .then(resp => {
                console.log(resp)
                dispatch(loadApiPoductsSuccess(resp.data));
            })
            .catch(error => {
                dispatch(loadApiPoductstFail(error));
            });
    };
};
