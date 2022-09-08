import React, {useState} from "react";
import '../../assets/material-kit.css'
import Product from "../Product/Product";
import ReactPaginate from 'react-paginate';
import styled from 'styled-components'
const Products = (props) =>{


    return (
        <>

            <div className="main main-raised product-page " style={{margin : 0,background:"#FFF"}}>
                <div className="container">
                    <h2 className="section-title">Search Results</h2>
                    <div className="row">
                        {

                            props.isLoading ? (
                                    <>
                                        <img src="/assets/img/loading.jpg"  alt=""/>
                                    </>
                                ) :

                                props.products && props.products.length === 0 ?
                                    (
                                        <>
                                            <img src="/assets/img/no-data.jpg"  alt=""/>
                                        </>
                                    ) : props.products && props.products.length !== 0 ?

                                    props.products && props.products.map((item,index) => {
                                        return <Product product={item} key={index}/>
                                    }) : (
                                            <>
                                                <img src="/assets/img/empty.jpg"  alt=""/>
                                            </>
                                        )
                        }
                    </div>

                </div>
            </div>

        </>
    )
}
export default Products;