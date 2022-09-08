import {useEffect} from "react"
import { useSelector,useDispatch } from "react-redux"
import { getProductsHistory } from "../actions/products.history.actions"
import Products from "../components/Products/Products"
import {useParams} from 'react-router';
import DashbordClient from "../components/ClientDashbord/DashbordClient";
import DashbordClientLayout from "../core/DashbordClientLayout";


export const   ProductsHistoryPage = (props) => {
    const dispatch = useDispatch()
    const {name,brand,price} = useParams();
    
    useEffect(()=> {
            dispatch(getProductsHistory(name,brand,price))
    }, [dispatch,name,brand,price])

    const productsHistoryState = useSelector(state => state.ProductsHistoryReducer)
    const display = productsHistoryState.idLoading ? (
        <p>loading ..;</p>
    ): productsHistoryState.errors ? (
        <p>{productsHistoryState.errors}</p>
    ) : (
        <Products products = {productsHistoryState.products}/>
    )
    return (
        <>
            <DashbordClientLayout>
            {display}
            </DashbordClientLayout>
            
        </>
    )

}