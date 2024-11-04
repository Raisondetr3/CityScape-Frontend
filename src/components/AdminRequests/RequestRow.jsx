import React from 'react';
import AcceptButton from '../Buttons/AdminActionButtons/AcceptButton';
import RejectButton from '../Buttons/AdminActionButtons/RejectButton';
import './RequestRow.css';

const RequestRow = ({ username, onApprove, onReject }) => (
    <div className="request-row">
        <p className="username-text">username: {username}</p>
        <div className="buttons-container">
            <AcceptButton onClick={onApprove} />
            <RejectButton onClick={onReject} />
        </div>
    </div>
);

export default RequestRow;
