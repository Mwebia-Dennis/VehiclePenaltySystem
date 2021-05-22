import React from 'react'
import Table from '../../shared_components/table';
import { PenaltyTableHeader, PenaltyData } from '../../data/PenaltyData'
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
            url:"/penalty", 
            name: "Penalty"
        }
        
    ]

    return (

        <div>
            <BreadCrumb links={links} />
            <MainActionContainer data={pageType.penalty}/>
            <Table rows= {PenaltyData} tableHeader ={ PenaltyTableHeader }/>
            <Paginator />
        </div>

    );



}
