
import React, {useEffect} from 'react'
import { Outlet } from 'react-router';

import AppBar from '../../shared_components/AppBar1';
import { useStyles } from './style'
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../../../store/reducers/auth/auth.actions'

export default function Home(props) {

    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        
        dispatch(getUserDetails())

    }, [''])
    
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
