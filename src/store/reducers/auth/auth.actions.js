
import axios from 'axios'
import {
    SET_AUTHENTICATED,
    CLEAR_ERROR,
    SET_USER_DETAILS,
    LOADING_USER,
    SET_ERROR,
    SET_MESSAGE
} from './auth.types'



const setAuthorizationHeader = () => {
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != '') {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    }
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


export const signUpUser = (userData, navigate, isSignUp = true) => (dispatch) => {

    dispatch({ type: LOADING_USER })
    axios.post('auth/signup', userData)
    .then((res)=>{
        
        dispatch({ type: CLEAR_ERROR})
        dispatch({ type: SET_AUTHENTICATED})
        dispatch({
            type: SET_MESSAGE,
            payload: res.data.message
        })

        if(isSignUp) {
            navigate('/auth/login')
        }else {
            
            navigate('/users')
        }

    })
    .catch((error)=> {
        dispatch({
            type: SET_ERROR,
            payload: error.response.data
        })
    })

}


export const getUserDetails = () => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_USER })
    axios.get('auth/user-details')
    .then((res)=>{
        
        dispatch({ type: CLEAR_ERROR})
        dispatch({
            type: SET_USER_DETAILS,
            payload: res.data
        })


    })
    .catch((error)=> {
        
        dispatch({
            type: SET_ERROR,
            payload: error.response.data
        })
    })

}