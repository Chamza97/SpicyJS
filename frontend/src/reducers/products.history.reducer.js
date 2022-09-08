import {productsHistoryConstants} from "../constants/products.history.constants";


const initState = {
    isLoading: true,
    products:  [],
    error: '',

};
function ProductsHistoryReducer(state = initState, action) {
    switch (action.type) {
        case productsHistoryConstants.LOAD_PRODUCTS_HISTORY :
            return {
                isLoading: true,
                products:  [],
                error: '',
            };
        case productsHistoryConstants.LOAD_PRODUCTS_HISTORY_SUCCESS :
            return {
                isLoading: false,
                products: action.payload,
                error: '',
            };
        case productsHistoryConstants.LOAD_PRODUCTS_HISTORY_FAIL:
            return {
                isLoading: false,
                product: [],
                error: action.payload,
            };
        
        default:
            return state;
    }
}
export default ProductsHistoryReducer;