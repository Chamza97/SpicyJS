import React from 'react';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import './App.css';

// 7otha fi .env
const PUBLIC_kEY="pk_test_51IamIQHlGOBbiyd3upWhT334o7zuDgEQrjXx6PhtSBbu8ea9YD80qTVt8VmDYcM96plsc6FFGxgAI7GZ55Osjsic00B3uZzpRL";

const stripeTestPromise = loadStripe(PUBLIC_kEY)
export default function StripesContainer () {
    return (
        <Elements stripe={stripeTestPromise}>
           <PaymentForm/>
        </Elements>
        
    )
}