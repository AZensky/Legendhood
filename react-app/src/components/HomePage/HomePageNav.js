import { Link, useHistory } from 'react-router-dom';
import './HomePageNav.css'

function HomePageNav() {
    const history = useHistory();

    return (
        <nav>
            <div className='home-page-logo'>
                <Link to='/'>
                    <img src='https://1000logos.net/wp-content/uploads/2021/05/Robinhood-logo.png' alt='logo' />
                </Link>
            </div>
            <div className='home-page-login-signup'>
                <button onClick={() => history.push('/login')}>Log in</button>
                <button
                    onClick={() => history.push('/signup')}
                    className='home-page-sign-up'
                >Sign up</button>
            </div>
        </nav>
    )
}

export default HomePageNav;
