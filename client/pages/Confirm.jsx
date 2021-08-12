
import React, { useEffect } from 'react';

export const Confirm = ({imagePath}) => {


    return (
        <div>
        <h1>Verification</h1>

        <img src={`/blob/image-preview?image=${imagePath}`} />
        
        </div>

    )
}