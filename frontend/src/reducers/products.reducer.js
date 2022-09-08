import {productConstants} from "../constants/products.contants";


const initState = {
    isLoading: false,
    products:  [],
    error: '',

};
function ProductsReducer(state = initState, action) {
    switch (action.type) {
        case productConstants.LOAD_PRODUCTS :
            return {
                isLoading: true,
                products:  [],
                error: '',
            };
        case productConstants.LOAD_PRODUCTS_SUCCESS :
            return {
                isLoading: false,
                products: action.payload,
                error: '',
            };
        case productConstants.LOAD_PRODUCTS_FAIL:
            return {
                isLoading: false,
                product: action.payload.docs,
                error: '',
            };
        case productConstants.TRACK_PRODUCT_SUCCESS:
            var foundIndex = state.products.data.findIndex(({_id}) => _id == action.payload[0]._id);
            state.products.data[foundIndex] = action.payload[0];
            return {
                isLoading: false,
                products: state.products,
                error: '',
            };
        case productConstants.UNTRACK_PRODUCT_SUCCESS:
            var i = state.products.data.findIndex(({_id}) => _id == action.payload[0]._id);
            state.products.data[i] = action.payload[0];
            return {
                isLoading: false,
                products: state.products,
                error: '',
            };
        default:
            return state;
    }
}
export default ProductsReducer;