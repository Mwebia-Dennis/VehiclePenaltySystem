
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

export const loginUser = (userData, navigate) => (dispatch) => {

    dispatch({ type: LOADING_USER })
    axios.post('login', userData)
    .then((res)=>{

        dispatch({ type: CLEAR_ERROR})
        dispatch({ type: SET_AUTHENTICATED})
        dispatch({
            type: SET_MESSAGE,
            payload: res
        })

        navigate('/home')

    })
    .catch((error)=> {
        
        console.log(error)
        dispatch({
            type: SET_ERROR,
            payload: error
        })
    })

}