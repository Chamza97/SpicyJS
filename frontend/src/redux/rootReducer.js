import {combineReducers} from "redux";
import trackedProductsReducer from "../reducers/tracked.products.reducer";
import notificationsReducer from "../reducers/notifiacations.reducer";
import ProductsReducer from "../reducers/products.reducer";
import productReducer from "../reducers/product.reducer";
import productpricesReducer from "../reducers/productprices.reducer";
import ProductsHistoryReducer from "../reducers/products.history.reducer"
import productSRecommendationReducer from "../reducers/product.recommendation.reducer";


export const rootReducer = combineReducers({
        trackedProductsReducer,
        notificationsReducer,
        ProductsReducer,
        productReducer,
        productpricesReducer,
        ProductsHistoryReducer,
        productSRecommendationReducer

}
)