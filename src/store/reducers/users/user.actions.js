
import axios from 'axios'

import {
    CLEAR_ERROR,
    LOADING_USER_DATA,
    SET_DATA,
    SET_ERROR
} from './user.types'


const setAuthorizationHeader = () => {
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != '') {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    }
};

export const getUserData = () => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_USER_DATA })
    axios.get('users')
    .then((res)=>{
        
        dispatch({ type: CLEAR_ERROR})
        dispatch({
            type: SET_DATA,
            payload: res
        })


    })
    .catch((error)=> {
        
        dispatch({
            type: SET_ERROR,
            payload: error.response.data
        })
    })

}
