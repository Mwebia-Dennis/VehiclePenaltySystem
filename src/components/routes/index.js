
import Home from '../views/home';
import Dashboard from '../views/dashboard/index';

export const routes = [

    {
     
        path: '/',
        element : <Home />,
        children: [

            {path: '/home', element: <Dashboard />},
            {path: '/vehicle', element: <Dashboard />},
            {path: '/penalty', element: <Dashboard />},
            {path: '/users', element: <Dashboard />},
            {path: '/invoices', element: <Dashboard />},
        ]
        
    }

];