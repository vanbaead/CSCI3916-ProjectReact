import actionTypes from '../constants/actionTypes';
import axios from 'axios';
const env = process.env;

function updateChats(chats) {
    return {
        type:actionTypes.UPDATE_CHATS,
        chats: chats
    }
}

export function fetchChats(query) {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${env.REACT_APP_API_URL}/Chat`, {
                params: {
                    'language' : query
                },
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                mode: 'cors'
            });

            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const res = response.data;
            dispatch(updateChats(res));
        } catch (error) {
            console.error('Error during fetching chats', error);
        }
    }
}

export function postChat(data, user, query) {
    return async (dispatch) => {
        try {
            const body = JSON.stringify({
                "user": user,
                "text": data
            });
            const response = await axios.post(`${env.REACT_APP_API_URL}/Chat`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                mode: 'cors'
            });

            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }

            dispatch(fetchChats(query));
        } catch (error) {
            console.error('Error during posting chat', error);
        }
    }
}