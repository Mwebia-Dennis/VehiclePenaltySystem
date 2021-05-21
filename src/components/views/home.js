
import React from 'react'
import { Outlet } from 'react-router';

import SideMenu from '../shared_components/side_menu';

export default (props) => {
    
    return (
        <>
            <SideMenu body={ <Outlet /> }/>
            
            
        </>
    )
}
