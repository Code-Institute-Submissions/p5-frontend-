import React from 'react';
import {Spinner} from 'react-bootstrap'

const Asset = ({spinner, message}) => {
    return (
        <div>
            {spinner && <Spinner animation='grow'/>}
            {message && <p className='mt-4'>{message}</p>}
        </div>
    )
}

export default Asset;