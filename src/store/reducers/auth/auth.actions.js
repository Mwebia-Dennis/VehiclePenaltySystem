
import axios from 'axios'
import {
    SET_AUTHENTICATED,
    CLEAR_ERROR,
    CLEAR_MESSAGE,
    LOADING_USER,
    SET_ERROR,
    SET_MESSAGE,
    SET_UNAUTHENTICATED
} from './auth.types'



const setAuthorizationHeader = () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');
};

export const loginUser = (userData, navigate) => (dispatch) => {

    dispatch({ type: LOADING_USER })
    axios.post('auth/login', userData)
    .then((res)=>{
        localStorage.setItem('access_token', `Bearer ${res.data.access_token}`);
        setAuthorizationHeader()
        dispatch({ type: CLEAR_ERROR})
        dispatch({ type: SET_AUTHENTICATED})
        dispatch({
            type: SET_MESSAGE,
            payload: "successful login"
        })

        navigate('/home')

    })
    .catch((error)=> {
        
        dispatch({
            type: SET_ERROR,
            payload: error.response.data
        })
    })

}


export const signUpUser = (userData, navigate) => (dispatch) => {

    dispatch({ type: LOADING_USER })
    axios.post('auth/signup', userData)
    .then((res)=>{
        
        dispatch({ type: CLEAR_ERROR})
        dispatch({ type: SET_AUTHENTICATED})
        dispatch({
            type: SET_MESSAGE,
            payload: res
        })

        navigate('/auth/login')

    })
    .catch((error)=> {
        dispatch({
            type: SET_ERROR,
            payload: error.response.data
        })
    })

}