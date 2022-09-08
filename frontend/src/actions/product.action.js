import {productConstants} from "../constants/product.constants";
import {
    addUserDesiredPrice,
    getProduct,
    removeUserDesiredPrice,
    updateUserDesiredPrice
} from "../services/product.service";

export const loadApiProduct = () => {
    return {
        type: productConstants.LOAD_PRODUCT,
    };
};
export const loadApiProductSuccess = product => {
    return {
        type: productConstants.LOAD_PRODUCT_SUCCESS,
        payload: product,
    };
};
export const loadApiProducttFail = error => {
    return {
        type: productConstants.LOAD_PRODUCT_FAIL,
        payload: error,
    };
};
export const setTargetPriceSuccess = error => {
    return {
        type: productConstants.ADD_PRODUCT_TARGET_PRICE_SUCCESS,
        payload: error,
    };
};
export const updateTargetPriceSuccess = error => {
    return {
        type: productConstants.UPDATE_PRODUCT_TARGET_PRICE_SUCCESS,
        payload: error,
    };
};
export const removeTargetPriceSuccess = error => {
    return {
        type: productConstants.REMOVE_PRODUCT_TARGET_PRICE_SUCCESS,
        payload: error,
    };
};

export const getApiProduct = (productId) => {
    return dispatch => {
        dispatch(loadApiProduct);
        getProduct(productId)
            .then(resp => {
                dispatch(loadApiProductSuccess(resp));
            })
            .catch(error => {
                dispatch(loadApiProducttFail(error));
            });
    };
};
export const updateTargetPrice = (productId,price) => {
    return dispatch => {
        dispatch(loadApiProduct);
        updateUserDesiredPrice(productId, price)
            .then(resp => {
                dispatch(updateTargetPriceSuccess(resp));
            })
    };
};
export const addTargetPrice = (productId,price) => {
    return dispatch => {
        dispatch(loadApiProduct);
        addUserDesiredPrice(productId, price)
            .then(resp => {
                dispatch(setTargetPriceSuccess(resp));
            })
    };
};
export const removeTargetPrice = (productId) => {
    return dispatch => {
        dispatch(loadApiProduct);
        removeUserDesiredPrice(productId)
            .then(resp => {
                dispatch(removeTargetPriceSuccess(resp));
            })
    };
};

