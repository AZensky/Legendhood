import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session'
import './LogInPage.css';

function LogInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password))
        if (data) {
            setErrors(data)
        }
    };

    const loginDemoUser = async (e) => {
        e.preventDefault();
        const data = await dispatch(login('demo@aa.io', 'password'))
        if (data) {
            setErrors(data)
        }
    }

    if (user) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className='login-page'>
            <div className='login-page-left-panel'>
                <img className='login-page-img' src='https://cdn.robinhood.com/assets/generated_assets/webapp/632fcb3e7ed928b2a960f3e003d10b44.jpg' alt='login-page-img' />
            </div>
            <div className='login-page-right-panel'>
                <div className='login-form'>
                    <form onSubmit={handleSubmit}>
                        <p>Log in to Robinhood</p>
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <div className="form-element">
                            <label>
                                Email
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    maxLength='50'
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-element">
                            <label className='password'>
                                Password
                                <input
                                    type="password"
                                    value={password}
                                    maxLength='50'
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="form-element-button">
                            <button type="submit">Log In</button>
                            <button onClick={loginDemoUser}>Demo User</button>
                        </div>
                        <div className='login-page-signup'>
                            <span>Not on Robinhood?</span>
                            <Link to='/signup'>Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LogInPage;
