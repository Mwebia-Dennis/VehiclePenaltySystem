
import Home from '../views/home';
import Dashboard from '../views/dashboard/index';
import Vehicle from '../views/vehicle';
import Penalty from '../views/penalty';
import Users from '../views/users';
import FormContainer from '../views/form_container';
import { formTypes } from '../../utils/constants'

export const routes = [

    {
     
        path: '/',
        element : <Home />,
        children: [

            {path: '/home', element: <Dashboard />},
            {path: '/vehicle', element: <Vehicle />},
            {path: '/penalty', element: <Penalty />},
            {path: '/users', element: <Users />},
            {path: '/invoices', element: <Dashboard />},
            {path: '/new-vehicle', element: <FormContainer formType={ formTypes.newVehicle } />},
            {path: '/new-user', element: <FormContainer formType={ formTypes.newUser } />},
            {path: '/new-penalty', element: <FormContainer formType={ formTypes.newPenalty } />},
        ]
        
    }

];