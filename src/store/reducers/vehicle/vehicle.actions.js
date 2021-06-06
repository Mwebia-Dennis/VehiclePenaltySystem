
import axios from 'axios'

import {
    CLEAR_VEHICLE_ERROR,
    CLEAR_VEHICLE_MESSAGE,
    LOADING_VEHICLE_DATA,
    SET_VEHICLE_DATA,
    SET_VEHICLE_ERROR,
    SET_VEHICLE_MESSAGE,
} from './vehicle.types'


const setAuthorizationHeader = () => {
    if(localStorage.getItem('access_token') && localStorage.getItem('access_token') != '') {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token');

    }
};

export const getAllVehicles = () => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_VEHICLE_DATA })
    axios.get('vehicle')
    .then((res)=>{
        
        dispatch({ type: CLEAR_VEHICLE_ERROR})
        dispatch({
            type: SET_VEHICLE_DATA,
            payload: res.data
        })


    })
    .catch((error)=> {
        
        dispatch({
            type: SET_VEHICLE_ERROR,
            payload: error.response.data
        })
    })

}

export const setNewVehicle = (newData, user_id, navigate) => (dispatch) => {

    dispatch({ type: LOADING_VEHICLE_DATA })
    axios.post('users/'+user_id+'/vehicle', newData)
    .then((res)=>{
        
        dispatch({ type: CLEAR_VEHICLE_ERROR})
        dispatch({
            type: SET_VEHICLE_MESSAGE,
            payload: res.data.message
        })

        navigate('/vehicle')

    })
    .catch((error)=> {
        dispatch({
            type: SET_VEHICLE_ERROR,
            payload: error.response.data
        })
    })

}


export const searchVehiclesData = (data) => (dispatch) => {

    setAuthorizationHeader()
    dispatch({ type: LOADING_VEHICLE_DATA })
    axios.post('vehicles-search', data)
    .then((res)=>{
        
        dispatch({ type: CLEAR_VEHICLE_ERROR})
        dispatch({
            type: SET_VEHICLE_DATA,
            payload: res.data
        })


    })
    .catch((error)=> {
        
        dispatch({
            type: SET_VEHICLE_ERROR,
            payload: error.response.data
        })
    })

}


