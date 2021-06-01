import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer'
import { userReducer } from './users/user.reducer'
import { vehicleReducer } from './vehicle/vehicle.reducer'
export default combineReducers({

    authReducer: authReducer,
    userReducer: userReducer,
    vehicleReducer: vehicleReducer,
});