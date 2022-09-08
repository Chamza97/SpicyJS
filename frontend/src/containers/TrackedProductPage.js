import DashbordClientLayout from "../core/DashbordClientLayout";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../actions/tracked.products.action";
import React, {useEffect, useState} from "react";
import {useParams} from 'react-router';
import {getApiProduct} from '../actions/product.action';
import {getApiProductPrices} from '../actions/productprices.action';
import ProductRecommendationContainer from '../containers/products.recommendation.container/product.recommendation.container';
import ShowProductPrices from "../components/ShowProductPrices/ShowProductPrices";
import styled from "styled-components";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {Button , ButtonGroup} from 'react-bootstrap';
import {getPriceCurrency} from "../services/product.service";
import {ProductDetail} from "./ProductDetail/ProductDetail";

export const TrackedProductPage = () => {

  let {id} = useParams();
  const dispatch = useDispatch();
  const productReducer = useSelector(state => state.productReducer);
  useEffect(() => {

    dispatch(getApiProduct(id));
    dispatch(getApiProductPrices(id))


  }, [dispatch, id]);

let toto = productReducer.product ?  productReducer.product.price :0


  const resultState = useSelector(state => state.productpricesReducer);

  const displayChart  = resultState.isLoading || productReducer.isLoading ?
                  (
                      <p>is Loading</p>
                  ): resultState.error  || productReducer.error?(
                      <p>resultState.error</p>
                  ) : (

                        <ShowProductPrices product ={productReducer.product} data ={resultState.productprices.values}/>
                  )

    const displayProductDetail  =  productReducer.isLoading ?
        (
            <p>is Loading</p>
        ): productReducer.error?(
            <p>resultState.error</p>
        ) : (
            <>
                <ProductDetail product ={productReducer.product}/>
            </>

        )
  return (
    <>
      <DashbordClientLayout>
          <div className="product-page">
              <div className="container">
                  {displayProductDetail}
                  {displayChart}
              </div>
          </div>
      </DashbordClientLayout>
    </>
  );
}