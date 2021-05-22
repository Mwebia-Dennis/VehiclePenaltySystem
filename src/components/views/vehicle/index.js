import React from 'react'
import Table from '../../shared_components/table';
import { VehicleData, VehicleTableHeader } from '../../data/VehicleData'
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
            url:"/vehicle", 
            name: "Vehicle"
        }
        
    ]
    return (

        <div>

            <BreadCrumb links={links} />
            <MainActionContainer  data={pageType.vehicle} />
            <Table rows= {VehicleData} tableHeader ={ VehicleTableHeader }/>
            <Paginator />
        </div>

    );



}
