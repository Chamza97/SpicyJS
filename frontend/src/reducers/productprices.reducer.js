import {productpricesConstants} from "../constants/productprices.constants";

const initState = {
    isLoading: true,
    productprices:  [],
    error: '',
};
function productpricesReducer(state = initState, action) {
    switch (action.type) {
        case productpricesConstants.LOAD_PRODUCT_PRICES:
            return {
                productprices:  [],
                error: '',
                isLoading: true,
            };
        case productpricesConstants.LOAD_PRODUCT_PRICES_SUCCESS:
            return {
                error: '',
                isLoading: false,
                productprices: action.payload,
            };
        case productpricesConstants.LOAD_PRODUCT_PRICES_FAIL:
            return {
                productprices:  [],
                isLoading: false,
                error: action.payload,
            };
        
        default:
            return state ;
    }
}
export default productpricesReducer;