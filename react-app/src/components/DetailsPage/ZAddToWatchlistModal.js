// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ZAddToWatchlistForm from './ZAddToWatchlistForm';

function ZAddToWatchlistModal({ amountChanged }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className={`details-page-right-container-add-to-lists-button ${amountChanged < 0 ? "red" : "green"}`}
            >
                + Add to Lists
            </button>
            {showModal && (
                <>
                    <Modal onClose={() => setShowModal(false)} formType="edit-group">
                        <ZAddToWatchlistForm setShowModal={setShowModal} />
                    </Modal>
                </>
            )}
        </>
    );
}

export default ZAddToWatchlistModal;
