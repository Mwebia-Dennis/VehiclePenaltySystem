
import React from 'react'
import { Outlet } from 'react-router';

import AppBar from '../../shared_components/AppBar1';
import { useStyles } from './style'

export default (props) => {

    const classes = useStyles()
    
    return (
        <>

            <AppBar />

            <div className={classes.root}>
                
                <Outlet /> 

            </div>
            {/* <SideMenu body={ <Outlet /> }/> */}
            
            
        </>
    )
}
