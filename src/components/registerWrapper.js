import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './register';
import AuthBox from './authBox';

function RegisterWrapper(props) {
    const navigate = useNavigate(); // Initialize useNavigate

    // Pass navigate as a prop to the class-based Login component
    return <AuthBox><Register {...props} navigate={navigate} /></AuthBox>;
}

export default RegisterWrapper;
