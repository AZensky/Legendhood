import './HomePageGnteeSec.css';

function HomePageGnteeSec() {
    return (
        <div className='home-page-gntee-sec'>
            <div className='gntee-title'>
                <p>Legendhood Protection Guarantee</p>
            </div>
            <div className='gntee-icons'>
                <div className='gntee-icon-ind'>
                    <img src='https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/lock-bubble__aa7c3e338d988a156e260b93760cf7c3.png' alt='safe-secure' />
                    <div className='gntee-content'>We work hard to keep your data safe and secure.</div>
                </div>
                <div className='gntee-icon-ind'>
                    <img src='https://i.imgur.com/dw0h3Q3.png' alt='unauthorized-activity' />
                    <div className='gntee-content'>We protect your account from unauthorized activity.</div>
                </div>
                <div className='gntee-icon-ind'>
                    <img src='https://i.imgur.com/DA1Dvk1.png' alt='multi-factor-auth' />
                    <div className='gntee-content'>We provide multi-factor authentication on all accounts.</div>
                </div>
                <div className='gntee-icon-ind'>
                    <img src='https://i.imgur.com/Pa1pru8.png' alt='customer-service' />
                    <div className='gntee-content'>We’ve got your back. We’re available to you 24/7.</div>
                </div>
            </div>
        </div>
    );
}

export default HomePageGnteeSec;
