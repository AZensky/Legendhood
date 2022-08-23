import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBuyingPower } from '../../store/session';
import './FundTransferForm.css'

function FundTransferForm({ onClose }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user);
    const [amount, setAmount] = useState(0.00);
    const [fromAccount, setFromAccount] = useState('');
    const [to, setTo] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSumbit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const newTransfer = {
            amount,
            from_account: fromAccount,
            to,
        }

        if (user) {
            const data = await dispatch(addBuyingPower(user.id, newTransfer));
            if (data) {
                setErrors(data);
            } else {
                history.push('/dashboard');
            }
        }
    }

    return (
        <div className="transfer-form">
            <div className='transfer-form-title'>
                <button className='transfer-form-close-btn' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <p className="tranfer-text">Transfer money</p>
            </div>
            <form onSubmit={handleSumbit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="form-element">
                    <label>
                        Amount
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            min='0.01'
                            step='0.01'
                            required
                        />
                    </label>
                </div>
                <div className="form-element">
                    <label>
                        From
                        <select
                            name='fromAccount'
                            value={fromAccount}
                            onChange={(e) => setFromAccount(e.target.value)}
                            required
                        >
                            <option value='bank account'>Bank Account</option>
                            <option value='legendhood'>Legendhood</option>
                        </select>
                    </label>
                </div>
                <div className="form-element">
                    <label>
                        To
                        <select
                            name='to'
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            required
                        >
                            <option value='legendhood'>Legendhood</option>
                            <option value='bank account'>Bank Account</option>
                        </select>
                    </label>
                </div>
                <div className='form-element'>
                    <button type="submit">Transfer</button>
                </div>
            </form>
        </div>
    )
}

export default FundTransferForm;
