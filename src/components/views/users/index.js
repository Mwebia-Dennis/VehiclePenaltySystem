import React from 'react'
import Table from '../../shared_components/table';
import { UsersData, UsersTableHeader } from '../../data/usersData'
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import { pageType }  from '../../../utils/constants'

export default (props) => {
    
    
    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/users", 
            name: "Users"
        }
        
    ]
    return (

        <>
            <div>
                <BreadCrumb links={links} />
                <MainActionContainer 
                    data={pageType.users} 
                    dataSet={UsersData} 
                    dataSetHeaders={UsersTableHeader} 
                />
                <Table rows= {UsersData} tableHeader ={ UsersTableHeader }/>
                <Paginator />
            </div>

        </>

    );



}
