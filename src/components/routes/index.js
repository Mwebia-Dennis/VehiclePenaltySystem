
import Home from '../views/Home';
import Auth from '../views/auth';
import Dashboard from '../views/dashboard/index';
import Vehicle from '../views/vehicle';
import Penalty from '../views/penalty';
import Users from '../views/users';
import Profile from '../views/profile';
import FormContainer from '../views/form_container';
import AutoGeneratedForm from '../views/auto_generate_page';
import AutoGenerateTable from '../views/auto_generate_table';
import { formTypes } from '../../utils/constants'
import { Navigate } from 'react-router';
import PageNotFound from '../views/page_not_found';

export const routes = (isLoggedIn) => [

    {
     
        path: '/',
        element : isLoggedIn?<Home />:<Navigate to="loading" />,
        children: [

            
            {path: '/', element: <Navigate to="/home" replace /> },
            {path: '/home', element: <Dashboard />},
            {path: '/vehicle', element: <Vehicle />},
            {path: '/penalty', element: <Penalty />},
            {path: '/users', element: <Users />},
            {path: '/invoices', element: <Dashboard />},
            {path: '/profile/:id', element: <Profile />},
            {path: '/new-vehicle', element: <FormContainer isForm={true} formType={ formTypes.newVehicle } />},
            {path: '/new-user', element: <FormContainer isForm={true} formType={ formTypes.newUser } />},
            {path: '/new-penalty', element: <FormContainer  formType={ formTypes.newPenalty } />},
            {path: 'auto/data/:menu_id', element: <AutoGenerateTable />},
            {path: '/category/data', element: <FormContainer  formType={ formTypes.newAutoGeneratedForm } />},
            {path: 'auto/form/:page_type', element: <AutoGeneratedForm formType={ formTypes.autoGenerateForm } />},
            { path: '*', element: <Navigate to="404" replace /> },
        ]
        
    },
    {
     
        path: 'auth',
        element : isLoggedIn ==true ?<Navigate to="/home" />:<Auth />,
        children: [

            {path: 'auth', element: <Navigate to="/auth/login" replace /> },
            {path: 'login', element: <FormContainer formType={ formTypes.login } />},
            {path: 'signup', element: <FormContainer formType={ formTypes.signUp } />},
            {path: 'forgot-password', element: <FormContainer formType={ formTypes.forgotPassword } />},
            {path: 'new-password', element: <FormContainer formType={ formTypes.newPassword } />},
            // {path: '/forgot-password', element: <Dashboard />},
            { path: '*', element: <Navigate to="/404" replace /> },
        ]
        
    },
    {
        path: '404',
        element : <PageNotFound />,
        children: [ 
            { path: '*', element: <Navigate to="/404" replace /> },
        ]
    },
    { path: '*', element: <Navigate to="404" replace /> },

];