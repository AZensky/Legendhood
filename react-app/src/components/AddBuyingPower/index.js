import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import FundTransferForm from './FundTransferForm';
import './AddBuyingPowerModal.css';

function AddBuyingPowerModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                className='transfer-funds-btn'
                onClick={() => setShowModal(true)}
            >Transfers</button>
            {showModal && (
                <div className='transfer-from-modal'>
                    <Modal onClose={() => setShowModal(false)}>
                        <FundTransferForm onClose={() => setShowModal(false)} />
                    </Modal>
                </div>
            )}
        </>
    )
}

export default AddBuyingPowerModal;
