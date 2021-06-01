
import axios from 'axios'


import {
    CLEAR_PENALTY_ERROR,
    LOADING_PENALTY_DATA,
    SET_PENALTY_DATA,
    SET_PENALTY_ERROR,
    SET_PENALTY_MESSAGE,
} from './penalty.types'


const setAuthorizationHeader = () => {
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != '') {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    }
};

export const getAllPenalties = () => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_PENALTY_DATA })
    axios.get('penalty')
    .then((res)=>{
        
        dispatch({ type: CLEAR_PENALTY_ERROR})
        dispatch({
            type: SET_PENALTY_DATA,
            payload: res.data
        })


    })
    .catch((error)=> {
        
        dispatch({
            type: SET_PENALTY_ERROR,
            payload: error.response.data
        })
    })

}

export const setNewPenalty = (newData, user_id, navigate) => (dispatch) => {

    dispatch({ type: LOADING_PENALTY_DATA })
    axios.post('users/'+user_id+'/penalty', newData)
    .then((res)=>{
        
        dispatch({ type: CLEAR_PENALTY_ERROR})
        dispatch({
            type: SET_PENALTY_MESSAGE,
            payload: res.data.message
        })

        navigate('/penalty')

    })
    .catch((error)=> {
        dispatch({
            type: SET_PENALTY_ERROR,
            payload: error.response.data
        })
    })

}



