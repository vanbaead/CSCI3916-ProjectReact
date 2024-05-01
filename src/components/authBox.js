import React from 'react';
import './Styles/authBox.css';

function AuthBox({ children }) {
    return (
        <div className="auth-box">
            <div className="auth-container">
                {children}
            </div>
        </div>
    );
}

export default AuthBox;
