import DashbordClientLayout from "../../core/DashbordClientLayout";
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../../actions/tracked.products.action";
import React, {useEffect} from "react";
import TrackedProducts from "../../components/TrackedProducts/TrackedProducts"
import ReactPaginate from "react-paginate";


export const TrackedProductsPage = () => {
    const uDispatch = useDispatch();
    useEffect(() => {
        uDispatch(getProducts(0))
    }, [uDispatch]);

    const trackedProductsResult = useSelector(state => state.trackedProductsReducer);

    const  handlePageClick = (e)=> {
        console.log(e.selected)
        uDispatch(getProducts(e.selected*6))
    }

    let displayProducts = trackedProductsResult.isLoading ?
        (
            <p>... is Loading </p>
        ) : trackedProductsResult.error !== '' ?
            (
                <p>{trackedProductsResult.error}</p>
            ) :
            (
                <>
                    <div className="main main-raised " style={{margin:0}}>


                        <div className="container">
                            <div className="cart card-plain">
                                <h2 className="section-title">Tracked Products</h2>
                                <div className="row">
                    <TrackedProducts products={trackedProductsResult.products}/>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={trackedProductsResult.totalProducts}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )
    return (
        <>
            <DashbordClientLayout>
                {displayProducts}
            </DashbordClientLayout>
        </>
    )
}
