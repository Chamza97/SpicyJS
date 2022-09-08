
import {productRecommendationConstants} from "../constants/product.recommendation";
import {getApiProductsRecommendation, postTrackProduct, postUntrackProduct} from "../services/product.service";
import {trackPoductstSuccess, untrackPoductstSuccess} from "./products.actions";
import {productConstants} from "../constants/products.contants";

export const loadApiProductrecommendations = () => {
    return {
        type: productRecommendationConstants.LOAD_PRODUCT_RECOMMENDATION,
    };
};
export const loadApiProductrecommendationsSuccess = products => {
    return {
        type: productRecommendationConstants.LOAD_PRODUCT_RECOMMENDATION_SUCCESS,
        payload: products,
    };
};
export const loadApiProductrecommendationsFail = error => {
    return {
        type: productRecommendationConstants.LOAD_PRODUCT_RECOMMENDATION_FAIL,
        payload: error,
    };
};
export const trackPoductsRecommendationtSuccess = products => {
    return {
        type: productRecommendationConstants.TRACK_PRODUCT_RECOMMENDATION_SUCCESS,
        payload: products,
    };
};
export const untrackPoductsRecommendationtSuccess = products => {
    return {
        type: productRecommendationConstants.UNTRACK_PRODUCT_RECOMMENDATION_SUCCESS,
        payload: products,
    };
};
export const getProductsRecommendation = () => {

    return uDispatch => {
        console.log("hhshhshhshshs")
        uDispatch(loadApiProductrecommendations());
        getApiProductsRecommendation()
            .then(resp => {
                uDispatch(loadApiProductrecommendationsSuccess(resp));
            })
            .catch(error => {
                uDispatch(loadApiProductrecommendationsFail(error));
            });
    };
};
export const trackProduct = (productId) => {
    return dispatch => {
        postTrackProduct(productId)
            .then(resp => {
                dispatch(trackPoductsRecommendationtSuccess(resp));
            })
    };
};

export const untrackProduct = (productId) => {
    return dispatch => {
        postUntrackProduct(productId)
            .then(resp => {
                dispatch( untrackPoductsRecommendationtSuccess(resp));
            })

    };
};