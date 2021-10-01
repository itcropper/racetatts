import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements
} from "@stripe/react-stripe-js";
import StripeCheckout from 'react-stripe-checkout';
//import {CheckoutForm} from '../components/CheckoutForm'

export const CheckoutPage = ({promise, stripeKey}) => {

    useEffect(() => {
        console.log(stripeKey);
    }, [stripeKey])

    const [product, setProduct] = useState({
      name: "race tattoo",
      price: "14.55",
      description: "a tattoo that really works!"
    })
    
    
  const handleToken = async (token, address) => {

    const req = await fetch('/api/checkout',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token, product, address
        })
    });

    console.log(req);

    const {status} = req;
    if(status===200){
        //display success toash
        alert('Success');
    }else{
        alert('Something went wrong');
    }
}

  return (
    <StripeCheckout 
    stripeKey="pk_test_51JPh7EL2vSryx9lau0eKyHEVQ0FO7CZVSIZhJs1jxOYvSMD7sDB6dM4tbSjr7vQqWfTSYZSYpnqazUdQLM5IpbVB00OMb5AmSr"
    billingAddress
    shippingAddress
    amount={product.price}
    name={product.name}
    token={handleToken} />
  );
}