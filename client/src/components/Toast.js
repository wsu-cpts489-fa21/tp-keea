import React, { useState, useEffect } from 'react';

const Toast = props => {
    const { position } = props;

    return (
        <>
            <div className={`notification-container ${position}`}>
                <div className={`notification toast ${position}`}>
                    <button>X</button>
                    <div className='notification-title'>{toast.title}</div>
                    <div className='notification-message'>{toast.description}</div>
                </div>
            </div>
        </>
    )
}

export default Toast;