
import React, { useEffect, useRef } from 'react';

export const Confirm = ({ imagePath }) => {

    const submit = useRef();

    const inputClassString = "focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-4 pl-4 my-4";

    useEffect(() => {

        const submitImage = () => fetch('/api/submit-confirmation', {
            method: 'POST',
            body: JSON.stringify({
                imagePath
            })
        });

        submit.current.addEventListener('click', submitImage);

        return () => {
            submit.current.remove('click', submitImage);
        }

    }, [imagePath]);

    return (
        <div>
            <div className="flex w-full">

                <div class="w-1/2 h-full px-8">
                    <div className="flex flex-col">
                        <p className="text-2xl my-4">Contact Information</p>
                        <label for="email-input" className="text-xl my-2 text-gray-400">
                            Email Address
                            <input type="email" className={inputClassString} id="email-input" onChange={() => { }} placeholder="Email" />
                        </label>

                        <p className="text-2xl my-4">Payment Details</p>
                        <label for="card-number-input" className="text-xl my-2 text-gray-400">
                            Card Number
                            <input type="text" className={inputClassString} id="card-number-input" onChange={() => { }} placeholder="---- ---- ---- ----" />
                        </label>
                        <div class="flex flex-row">
                            <label for="card-exp-input" className="text-xl my-2 text-gray-400 w-1/2 pr-4">
                                Expiration Date
                                <input type="text" className={inputClassString} id="card-exp-input" onChange={() => { }} placeholder="---- ---- ---- ----" />
                            </label>

                            <label for="card-cvc-input" className="text-xl my-2 text-gray-400 w-1/2 pl-4">
                                CVC Number
                                <input type="text" className={inputClassString} id="card-cvc-input" onChange={() => { }} placeholder="---- ---- ---- ----" />
                            </label>

                        </div>

                        <p className="text-2xl my-4">Shipping Information</p>
                        <label for="name-input" className="text-xl my-2 text-gray-400">
                            Name
                            <input type="email" className={inputClassString} id="name-input" onChange={() => { }} placeholder="Email" />
                        </label>

                        <label for="address-input" className="text-xl my-2 text-gray-400">
                            Address
                            <input type="email" className={inputClassString} id="address-input" onChange={() => { }} placeholder="Email" />
                        </label>

                    </div>
                </div>

                <div className="bg-gray-200 w-1/2 h-full">

                    <div className="flex flex-col w-10/12 justify-center">
                        <div className="flex flex-col">
                            <p className="text-md text-gray-400">Amount Due</p>
                            <p className="text-xl text-gray-600">$14.00</p>
                        </div>
                    </div>

                    <img src={`/api/image-preview?image=${imagePath}`} />




                    <div className="block">

                        <button
                            ref={submit}
                            className="save-button whitespace-nowrap inline-flex rounded-md bg-blue-500 my-5 py-2 px-10 text-base font-semibold uppercase text-white hover:bg-opacity-90">Submit & Pay</button>
                    </div>
                </div>
            </div>
        </div>
    )
}