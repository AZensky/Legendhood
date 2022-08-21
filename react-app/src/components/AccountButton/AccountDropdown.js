import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import './AccountDropdown.css';

function AccountDropdown() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu]);

    const onlogout = (e) => {
        e.preventDefault();
        dispatch(logout()).then(() => history.push('/'))
    }

    return (
        <>
            <button className='account-btn' onClick={openMenu}>Account</button>
            {showMenu && (
                <div className='account-dropdown'>
                    <h3 className='account-name'>{user.firstName} {user.lastName}</h3>
                    <div className='account-balance-summary'>
                        <div className='account-portfolio-value'>
                            <h3>$30,000.62</h3>
                            <div>Portfolio Value</div>
                        </div>
                        <div className='account-buying-power'>
                            <h3>{user.buyingPower}</h3>
                            <div>Buying Power</div>
                        </div>
                    </div>
                    <div className='account-logout-btn'>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        <button onClick={onlogout}>Log Out</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AccountDropdown;
