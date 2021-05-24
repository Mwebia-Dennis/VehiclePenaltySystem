
import Home from '../views/home';
import Auth from '../views/auth';
import Dashboard from '../views/dashboard/index';
import Vehicle from '../views/vehicle';
import Penalty from '../views/penalty';
import Users from '../views/users';
import EditProfile from '../views/edit_profile';
import FormContainer from '../views/form_container';
import { formTypes } from '../../utils/constants'
import { Navigate } from 'react-router';

export const routes = [

    {
     
        path: '/',
        element : <Home />,
        children: [

            
            {path: '/', element: <Navigate to="/home" replace /> },
            {path: '/home', element: <Dashboard />},
            {path: '/vehicle', element: <Vehicle />},
            {path: '/penalty', element: <Penalty />},
            {path: '/users', element: <Users />},
            {path: '/invoices', element: <Dashboard />},
            {path: '/edit-profile', element: <EditProfile />},
            {path: '/new-vehicle', element: <FormContainer formType={ formTypes.newVehicle } />},
            {path: '/new-user', element: <FormContainer formType={ formTypes.newUser } />},
            {path: '/new-penalty', element: <FormContainer formType={ formTypes.newPenalty } />},
        ]
        
    },
    {
     
        path: 'auth',
        element : <Auth />,
        children: [

            {path: 'auth', element: <Navigate to="/auth/login" replace /> },
            {path: 'login', element: <FormContainer formType={ formTypes.login } />},
            {path: 'signup', element: <FormContainer formType={ formTypes.signUp } />},
            {path: 'forgot-password', element: <FormContainer formType={ formTypes.forgotPassword } />},
            {path: 'new-password', element: <FormContainer formType={ formTypes.newPassword } />},
            // {path: '/forgot-password', element: <Dashboard />},
        ]
        
    },

];