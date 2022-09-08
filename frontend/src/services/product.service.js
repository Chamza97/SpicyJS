import axios from "axios";

const {isAuth} = require("../auth/helpers");
require('dotenv').config()

export function getTrackedProducts(offset) {
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`${process.env.REACT_APP_API}/product/get-tracked-products?userId=${encodeURIComponent(isAuth()._id)}&offset=${offset}`, requestOptions).then(handleResponse);
}
export function apiGetProducts(name,brand,price) {
    axios.post("http://localhost:8000/api/user-history/create", {
        name: name,
        brand: brand,
        price: price,
        userId : isAuth()._id
    });

   return axios.post("http://localhost:8000/bot/searchproduct", {
        name: name,
        brand: brand,
        price: price,
       userId : isAuth()._id
    });
}
export function apiGetAdminProducts() {
    return axios.get(`${process.env.REACT_APP_API}/product/get-all?userId=${encodeURIComponent(isAuth()._id)}`);
}
export function getProductPrices(productId){
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${process.env.REACT_APP_API}/prices/get-product-prices?idProduct=${productId}`, requestOptions).then(handleResponse);
}
export function getApiProductsRecommendation(){
    const requestOptions = {
        method: 'GET',
    };

    return fetch(`${process.env.REACT_APP_API}/product/get-product-recommandation?userId=${isAuth()._id}`, requestOptions).then(handleResponse);
}
export function postTrackProduct(productId) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({userId:encodeURIComponent(isAuth()._id),productId:productId})
    };

    return fetch(`${process.env.REACT_APP_API}/product/track-product`, requestOptions).then(handleResponse);
}

export function postUntrackProduct(productId) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({userId:encodeURIComponent(isAuth()._id),productId:productId})
    };
    return fetch(`${process.env.REACT_APP_API}/product/untrack-product`, requestOptions).then(handleResponse);
}
export function addUserDesiredPrice(productId,price ) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({userId:encodeURIComponent(isAuth()._id),productId:productId , price:price})
    };
    return fetch(`${process.env.REACT_APP_API}/product/set-user-desired-price`, requestOptions).then(handleResponse);
}
export function updateUserDesiredPrice(productId,price ) {
    const requestOptions = {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({userId:encodeURIComponent(isAuth()._id),productId:productId, price:price})
    };
    return fetch(`${process.env.REACT_APP_API}/product/update-user-desired-price`, requestOptions).then(handleResponse);
}
export function removeUserDesiredPrice(productId) {
    const requestOptions = {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({userId:encodeURIComponent(isAuth()._id),productId:productId})
    };
    return fetch(`${process.env.REACT_APP_API}/product/delete-user-desired-price`, requestOptions).then(handleResponse);
}

export function getProduct(productId){
    const requestOptions = {
        method: 'GET',
    };
    return fetch(`${process.env.REACT_APP_API}/product/get-product?productId=${productId}`, requestOptions).then(handleResponse);
}
export function getPriceCurrency(to){
   return  fetch(`https://free.currconv.com/api/v7/convert?q=TND_${to}&apiKey=eac7096202c68665d2ed`,
       { method: "GET",}).then(handleResponse)
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}