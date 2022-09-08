import React, {useState} from "react";

import TrackedProduct from "../TrackedProduct/TrackedProduct";
const TrackedProducts = (props) => {
    return (
        <>
            <>


                            <div className="col-lg-12 col-md-12 ml-auto mr-auto">
                                <div className="table-responsive">
                                    <table className="table table-shopping">
                                        <thead>
                                        <tr>
                                            <th className="text-center"></th>
                                            <th>Product</th>
                                            <th className="text-center">Availability</th>
                                            <th className="text-center">Price</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                           props.products.docs && props.products.docs.map((item,index) => {
                                                return <TrackedProduct product={item} key={index}/>
                                            })
                                        }
                                        {
                                           ! props.products.docs  && props.products.map((item,index) => {
                                                return <TrackedProduct product={item} key={index}/>
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

            </>
        </>
    );
}
export default TrackedProducts;