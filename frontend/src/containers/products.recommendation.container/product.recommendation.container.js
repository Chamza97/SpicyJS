import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProductsRecommendation} from "../../actions/products.recommendation.actions";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"

import SwiperCore, {
    Pagination,Navigation
} from 'swiper/core';

import {trackProduct, untrackProduct} from "../../actions/products.recommendation.actions";
SwiperCore.use([Pagination,Navigation]);
const ProductRecommendationContainer = () => {

    const uDispatch = useDispatch()
    useEffect(()=> {
        uDispatch(getProductsRecommendation())
    }, [uDispatch])
    const productsRecommendationReducer = useSelector(state => state.productSRecommendationReducer)

    function handleTrack(product) {
        uDispatch(trackProduct(product._id))
    }
    function handleUntrack(product) {
        uDispatch(untrackProduct(product._id))
    }

    const display  = productsRecommendationReducer.products && productsRecommendationReducer.products[0]&& productsRecommendationReducer.products[0].length > 0 ? (
        <div className="related-products">
            <h3 className="title text-center">You may also be interested in:</h3>
            <>

                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    slidesPerGroup={3}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{"clickable": true}}
                    navigation={true}
                    className="mySwiper"
                    key={productsRecommendationReducer.products[0].length}>
                    {productsRecommendationReducer.products && productsRecommendationReducer.products[0].map((product, index) => {

                        return (
                            <SwiperSlide key={index}>
                                <div className="card card-product">
                                    <div className="card-header card-header-image">
                                        <img className="img" src={product.image} alt=""/>
                                    </div>
                                    <div className="card-body">

                                        <h4 className="card-title">
                                            <a href="">{product.name}</a>
                                        </h4>
                                        <div className="card-description">
                                            {product.description}
                                        </div>
                                    </div>
                                    <div className="card-footer justify-content-between">
                                        <div className="price">
                                            <h4>{product.price} DT</h4>
                                        </div>
                                        <div className="stats">
                                            {!product.trackedByThisUser &&
                                            <>
                                                <button
                                                    className="btn btn-rose btn-link btn-fab  btn-round pull-right"
                                                    onClick={() => handleTrack(product)}>
                                                    <i className="material-icons">favorite_border</i>
                                                </button>
                                            </>
                                            }
                                            {product.trackedByThisUser &&
                                            <button type="button" rel="tooltip" title=""
                                                    onClick={() => handleUntrack(product)}
                                                    className="btn btn-just-icon btn-link btn-rose"
                                                    data-original-title="Saved to Wishlist">
                                                <i className="material-icons">favorite</i>
                                            </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>

                        )

                    })}


                </Swiper>
            </>
        </div>

        ) :(
           <>
           </>

    )

    return (
        <>
            {display}
        </>
    )
}
export default ProductRecommendationContainer