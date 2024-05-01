import actionTypes from '../constants/actionTypes';
import axios from 'axios';
const env = process.env;

function userLoggedIn(username) {
    return {
        type: actionTypes.USER_LOGGEDIN,
        username: username
    }
}

function logout() {
    return {
        type: actionTypes.USER_LOGOUT
    }
}

export function submitLogin(data, navigate) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${env.REACT_APP_API_URL}/signin`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                mode: 'cors'
            });

            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const res = response.data;
            localStorage.setItem('username', data.username);
            localStorage.setItem('token', res.token);

            dispatch(userLoggedIn(data.username));
            navigate('/chat');
        } catch (error) {
            console.error('Error during login', error);
        }
    }
}

export function submitRegister(data, navigate) {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${env.REACT_APP_API_URL}/signup`, data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'                    
                },
                body: JSON.stringify(data),
                mode: 'cors'
            });

            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }

            dispatch(submitLogin(data, navigate));
        } catch (error) {
            console.error('Error during registration', error);
        }
    }
}

export function logoutUser(navigate) {
    return dispatch => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/');
    }
}