import { useHistory } from 'react-router-dom';
import './HomePageJoinSec.css'

function HomePageJoinSec() {
    const history = useHistory();

    return (
        <>
            <div className='home-page-join-sec'>
                <div className='join-sec-title'>
                    Become a better investor on the go, right in the app
                </div>
                <div className='join-sec-subtitle'>
                    Here’s a preview of the things you can learn when you sign up.
                </div>
                <button onClick={() => history.push('/signup')}>Sign up to access Robinhood</button>
                <img src='https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/learn-phone__c458862ccad46260b6b1f604e0ad1173.png' alt='learn-the-basics' />
            </div>
            <div className='home-page-new-gen'>
                <div className='new-gen-title'>
                    Join a new generation of investors
                </div>
                <button onClick={() => history.push('/signup')}>Sign up</button>
            </div>
        </>
    );
}

export default HomePageJoinSec;
