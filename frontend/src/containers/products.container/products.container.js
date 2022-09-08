import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getProducts} from "../../actions/products.actions";
import Products from "../../components/Products/Products";
import DashbordClientLayout from "../../core/DashbordClientLayout";



export const ProductsPage = (props) => {

    const uDispatch = useDispatch();

    const productsResult = useSelector(state => state.ProductsReducer);
    const displayProducts = productsResult.isLoading ?
        (
           <img style={{maxWidth:"70%"}} src="/assets/img/loading.jpg" alt=""/>
        ) : productsResult.error ?
            (
                <p>{productsResult.error}</p>
            ) :
            (
                <>
                    <Products products={productsResult.products.data} isLoading={productsResult.isLoading}/>
                </>
            )
    return (
        <>
                {displayProducts}
        </>
    )
}