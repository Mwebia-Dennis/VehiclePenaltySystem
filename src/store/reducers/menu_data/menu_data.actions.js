
import axios from 'axios'

import {
    CLEAR_MENU_DATA_ERROR,
    CLEAR_MENU_DATA_MESSAGE,
    LOADING_MENU_DATA_DATA,
    SET_MENU_DATA_DATA,
    SET_MENU_DATA_ERROR,
    SET_MENU_DATA_MESSAGE
} from './menu_data.types'


const setAuthorizationHeader = () => {
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != '') {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    }
};

export const getMenuData = (menu_id,sort_by = 'created_at', page = 1, perPage = 25) => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_MENU_DATA_DATA })
    axios.get('menu/'+menu_id+'/menu-data?per_page='+perPage+'&page='+page+'&sort_by='+sort_by)
    .then((res)=>{
        
        dispatch({ type: CLEAR_MENU_DATA_ERROR})
        dispatch({
            type: SET_MENU_DATA_DATA,
            payload: res.data
        })


    })
    .catch((error)=> {
        
        dispatch({
            type: SET_MENU_DATA_ERROR,
            payload: error.response.data
        })
    })

}


export const setNewMenuData = (newData, user_id, navigate) => (dispatch) => {

    dispatch({ type: LOADING_MENU_DATA_DATA })
    axios.post('users/'+user_id+'/menu-data', newData)
    .then((res)=>{
        
        console.log(res)
        dispatch({ type: CLEAR_MENU_DATA_ERROR})
        dispatch({
            type: SET_MENU_DATA_MESSAGE,
            payload: res.data
        })

        navigate('/auto/data/'+newData.get('menu_id'))

    })
    .catch((error)=> {
        dispatch({
            type: SET_MENU_DATA_ERROR,
            payload: error.response.data
        })
    })

}




