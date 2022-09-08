import {productRecommendationConstants} from "../constants/product.recommendation";
import {productConstants} from "../constants/products.contants";

const initState = {
    isLoading: true,
    products:  null,
    error: '',
};
function productSRecommendationReducer(state = initState, action) {

    switch (action.type) {
        case productRecommendationConstants.LOAD_PRODUCT_RECOMMENDATION:
            return {
                isLoading: true,
            };
        case productRecommendationConstants.LOAD_PRODUCT_RECOMMENDATION_SUCCESS:
            return {
                isLoading: false,
                products: action.payload,
                error: '',
            };
        case productRecommendationConstants.LOAD_PRODUCT_RECOMMENDATION_FAIL:
            return {
                isLoading: false,
                products: null,
                error: action.payload,
            };
        case productRecommendationConstants.TRACK_PRODUCT_RECOMMENDATION_SUCCESS:
            const foundIndexR = state.products[0].findIndex(({_id}) => _id === action.payload[0]._id);
            state.products[0][foundIndexR] = action.payload[0];
            return {
                isLoading: false,
                products: state.products,
                error: '',
            };
        case productRecommendationConstants.UNTRACK_PRODUCT_RECOMMENDATION_SUCCESS:
            const iR = state.products[0].findIndex(({_id}) => _id === action.payload[0]._id);
            state.products[0][iR] = action.payload[0];
            return {
                isLoading: false,
                products: state.products,
                error: '',
            };

        default:
            return state;
    }
}
export default productSRecommendationReducer;