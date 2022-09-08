import DashbordAdminLayout from "../../core/DashbordAdminLayout";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getAdminProducts} from "../../actions/products.actions";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DataGrid, } from '@material-ui/data-grid';

const columns = [
    { field: 'id', headerName: 'ID', flex: 1},
    { field: 'name', headerName: 'Product name', flex: 1},
    { field: 'price', headerName: 'Last price', type: 'number', flex: 0.2},
    { field: 'url', headerName: 'URL', flex: 1},
    { field: 'onStock', headerName:'Is On Stock', flex:0.4},
    {field: 'trackerNumber', headerName:'Number of trackers', flex:0.4}
  ];

export const AdminAllProducstDetailsPage = () => {
    
    const uDispatch = useDispatch();
    useEffect(() => {
        uDispatch(getAdminProducts())
    }, [uDispatch]);
    
    const productsResult = useSelector(state => state.ProductsReducer);
    console.log(productsResult.products)
    const displayProducts = productsResult.isLoading ?
        (
            <p>... is Loading </p>
        ) : productsResult.products  && productsResult.products.data?
            (
                <>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid

                            rows={productsResult.products.data.map(function(p) {
                                    return { id : p._id, name : p.name, url : p.url, price:p.price, onStock: p.onStock, trackerNumber: p.trackedBy.length}
                                }
                            )} columns={columns} pageSize={5} checkboxSelection
                        />
                    </div>
                </>
            ):
        (
            <p>{JSON.stringify(productsResult.error)}</p>
        )
    return (
        <>

            <DashbordAdminLayout>
                <Card>
                    <CardContent>
                        {displayProducts}
                    </CardContent>
                </Card>
            </DashbordAdminLayout>


        </>
    )
}
