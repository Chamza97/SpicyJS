import {trackedProductConstants} from "../constants/show.tracked.produts.constants";

const initState = {
    isLoading: true,
    products:  [],
    error: '',
    totalProducts :0,
    offset : 0
};
function trackedProductsReducer(state = initState, action) {

    switch (action.type) {
        case trackedProductConstants.LOAD_TRACKED_PRODUCTS:
            return {
                ...state,
                isLoading: true,
            };
        case trackedProductConstants.LOAD_TRACKED_PRODUCTS_SUCCESS:
            return {
                isLoading: false,
                products: action.payload,
                error: '',
                totalProducts: action.payload.totalPages,
                offset: action.payload.offset
            };
        case trackedProductConstants.LOAD_TRACKED_PRODUCTS_FAIL:
            return {
                ...state,
                isLoading: false,
                products: [],
                error: action.payload,
            };
        case trackedProductConstants.LOAD_TRACKED_PRODUCTS_UNTRACK_PRODUCT_SUCCESS:
            console.log(state.products.docs.filter((product) => product._id !== action.payload[0]._id))
            return {
                isLoading: false,
                products: state.products.docs.filter((product) => product._id !== action.payload[0]._id),
                error: '',
            };
        default:
            return state;
    }
}
export default trackedProductsReducer;