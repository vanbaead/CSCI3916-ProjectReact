import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import AuthBox from './authBox';

function LoginWrapper(props) {
    const navigate = useNavigate();

    return <AuthBox><Login {...props} navigate={navigate} /></AuthBox>;
}

export default LoginWrapper;
