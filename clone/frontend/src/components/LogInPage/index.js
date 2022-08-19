import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LogInPage.css';

function LogInPage() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: hookup redux handling validation, login, catch errors
        return history.push('/dashboard');
    };

    const loginDemoUser = (e) => {
        e.preventDefault();

        // TODO: hookup redux handling validation, login, catch errors
        return history.push('/dashboard');
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
