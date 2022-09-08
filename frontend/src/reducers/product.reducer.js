import {productConstants} from "../constants/product.constants";

const initState = {
    isLoading: true,
    product:  null,
    error: '',
};
function productReducer(state = initState, action) {
    switch (action.type) {
        case productConstants.LOAD_PRODUCT:
            return {
                isLoading: true,
            };
        case productConstants.LOAD_PRODUCT_SUCCESS:
            return {
                isLoading: false,
                product: action.payload,
                error: '',
            };
        case productConstants.LOAD_PRODUCT_FAIL:
            return {
                isLoading: false,
                product: null,
                error: action.payload,
            };
        case productConstants.UPDATE_PRODUCT_TARGET_PRICE_SUCCESS :
            return {
                isLoading: false,
                product: action.payload,
                error: '',
            };
        case productConstants.ADD_PRODUCT_TARGET_PRICE_SUCCESS :
            return {
                isLoading: false,
                product: action.payload,
                error: '',
            };
        case productConstants.REMOVE_PRODUCT_TARGET_PRICE_SUCCESS :
            return {
                isLoading: false,
                product: action.payload,
                error: '',
            };

        default:
            return state;
    }
}
export default productReducer;