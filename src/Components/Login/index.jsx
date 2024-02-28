import { useState } from 'react';

import './index.css';

import LOGO from '../../Assets/logo.svg';
import { Quiz } from '../Quiz';

export const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    const [userSuccess, setUserSuccess] = useState(false);
    const [user, setUser] = useState({
        name: name,
        email: email,
    });

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isChecked) {
            setError(true);
            return;
        } else {
            setError(false);
        }

        console.log('Name:', name);
        console.log('Email:', email);

        setUser({
            name: name,
            email: email
        });

        if (Object.keys(user).length > 0) {
            setName('');
            setEmail('');
            setError('');

            setUserSuccess(true);
        }
    }

    const isSubmitDisabled = !name || !email || !isChecked;

    return (
        <>
            {userSuccess ? (
                <Quiz user={user} />
            ) : (
                <div className='login-page'>
                    <div className="login-form">
                        <div className='intro-container'>
                            <img src={LOGO} />
                            <h1>Please enter your name and email to continue the Ryde quiz</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='name-input input'>
                                <label htmlFor="name">Name <span>*</span></label>
                                <input type="text" id="name" name="name" value={name} onChange={handleNameChange} required />
                            </div>
                            <div className='email-input input'>
                                <label htmlFor="email">Email <span>*</span></label>
                                <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
                            </div>
                            <div className='terms-container'>
                                <input type="checkbox" id="terms" name="terms" checked={isChecked} onChange={handleCheckboxChange} />
                                <label htmlFor="terms">
                                    By clicking “Accept”, I agree to Ryde sending me information on promotions, products, services and research opportunities relating to Ryde and other current and future brands distributed by the Water Street Collective Limited that may be tailored to my preferences, purchases and app usage, including cart reminders. You can unsubscribe at any time. Tapt the Contact Us link for our contact information
                                </label>
                            </div>
                            <input className={`submit-button ${isSubmitDisabled ? 'disabled' : ''}`} type="submit" value="submit" disabled={isSubmitDisabled}/>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}