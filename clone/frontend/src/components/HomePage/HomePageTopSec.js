import { useHistory } from 'react-router-dom';
import './HomePageTopSec.css'

function HomePageTopSec() {
    const history = useHistory();

    return (
        <div className="first-sec">
            <div className='first-sec-left-panel'>
                <img className='phone1' src='https://i.imgur.com/pk6aHgr.png' alt='phone1' />
                <img className='phone2' src='https://i.imgur.com/AxS3BnH.png' alt='phone1' />
                <img className='phone3' src='https://i.imgur.com/JN2SJJm.png' alt='phone1' />
                <img className='phone4' src='https://i.imgur.com/fq0MiqO.png' alt='phone1' />
            </div>
            <div className='first-sec-right-panel'>
                <p>Investing is simple here</p>
                <button onClick={() => history.push('/signup')}>Get Started</button>
            </div>
        </div >
    );
}

export default HomePageTopSec;
