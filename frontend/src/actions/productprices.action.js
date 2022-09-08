import {productpricesConstants} from "../constants/productprices.constants";
import {getProductPrices} from "../services/product.service";

export const loadApiProductPrices = () => {
    return {
        type: productpricesConstants.LOAD_PRODUCT_PRICES,
    };
};
export const loadApiProductPricesSuccess = productprices => {
    return {
        type: productpricesConstants.LOAD_PRODUCT_PRICES_SUCCESS,
        payload: productprices,
    };
};
export const loadApiProductPricestFail = error => {
    return {
        type: productpricesConstants.LOAD_PRODUCT_PRICES_FAIL,
        payload: error,
    };
};


export const getApiProductPrices = (productId) => {
    return dispatch => {

        dispatch(loadApiProductPrices);
        getProductPrices(productId)
            .then(resp => {

                dispatch(loadApiProductPricesSuccess(resp));
            })
            .catch(error => {

                dispatch(loadApiProductPricestFail(error));
            });
    };
};
