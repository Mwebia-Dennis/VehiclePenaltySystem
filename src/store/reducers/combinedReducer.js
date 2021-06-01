import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer'
import { userReducer } from './users/user.reducer'
import { vehicleReducer } from './vehicle/vehicle.reducer'
import { penaltyReducer } from './penalty/penalty.reducer'
export default combineReducers({

    authReducer: authReducer,
    userReducer: userReducer,
    vehicleReducer: vehicleReducer,
    penaltyReducer: penaltyReducer,
});