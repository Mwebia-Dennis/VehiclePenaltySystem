
import {
    SET_AUTHENTICATED,
    CLEAR_ERROR,
    CLEAR_MESSAGE,
    LOADING_USER,
    SET_ERROR,
    SET_MESSAGE,
    SET_UNAUTHENTICATED
} from './auth.types'


const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    errors: null,
    message: null,
  };
export const authReducer = (state = initialState, action)=> {

    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
                loading: false,
            };
        
        
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
                loading: false,
            };

        
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: null,
                loading: false,
            };

        
        case LOADING_USER:
            return {
                ...state,
                loading: true,
            };

        
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

            
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
                loading: false,
            };

        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false,
                loading: false,
            };
        
        default:
            return state;
    }
}