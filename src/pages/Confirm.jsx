
import React, { useEffect, useRef, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

export const Confirm = ({ imagePath, imageId }) => {

    const submit = useRef();

    const inputClassString = "focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-4 pl-4 my-4";

    const btnStyles = "inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";


    const [imageName, setImageName] = useState(imagePath || imageId)

    useEffect(() => {

        const submitImage = () => fetch('/api/submit-confirmation', {
            method: 'POST',
            body: JSON.stringify({
                imagePath
            })
        });

        // submit.current.addEventListener('click', submitImage);

        // return () => {
        //     submit.current.remove('click', submitImage);
        // }

    }, [imagePath, imageId]);

    const [product, setProduct] = useState({
        name: "race tattoo",
        price: 14,
        description: "a tattoo that really works!"
    })


    const handleToken = async (token, address) => {

        const req = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token, 
                product, 
                address, 
                imageSource: imageName
            })
        });

        const { status } = req;
        if (status === 200) {
            //display success toash
            alert('Success');
        } else {
            alert('Something went wrong');
        }
    }

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const formattedPrice = (price) => {
        return formatter.format(price);
    }

    return (
        <div className="flex justify-center">
            <div className="flex w-9/12 my-10">
                <div className="w-2/3 h-full">
                    <img className="block" src={`${imageName}`} />
                </div>
                <div className="flex flex-col w-1/3 justify-center mx-4 my-20 gap-y-5">
                    <p className="text-md text-gray-400">Amount Due</p>
                    <p className="text-xl text-gray-600">{formattedPrice(product.price)}</p>

                    <StripeCheckout
                        className="flex justify-right"
                        stripeKey="pk_test_51JPh7EL2vSryx9lau0eKyHEVQ0FO7CZVSIZhJs1jxOYvSMD7sDB6dM4tbSjr7vQqWfTSYZSYpnqazUdQLM5IpbVB00OMb5AmSr"
                        billingAddress
                        shippingAddress
                        amount={product.price * 100}
                        name={product.name}
                        token={handleToken} >
                            <button className={btnStyles}>Confirm and Checkout</button>
                        </StripeCheckout>
                </div>
            </div>
        </div>
    )
}