import { useState } from 'react';

import './index.css';

import LOGO from '../../Assets/logo.svg';

export const End = () => {
    const handleButtonClick = () => {
        window.location.reload();
    }
    return (
        <>
            <div className='thankyou-page'>
                <div className='intro-container'>
                    <img src={LOGO} />
                    <h1>Thankyou for participating in our Ryde Quiz Survey</h1>
                    <button onClick={() => {handleButtonClick()}}>Start again</button>
                </div>
            </div>
        </>
    )
}