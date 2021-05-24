import React from 'react'
import Table from '../../shared_components/table';
import { PenaltyTableHeader, PenaltyData } from '../../data/PenaltyData'
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import Modal from '../../shared_components/modal';
import { pageType }  from '../../../utils/constants'

export default (props) => {

    
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = () => {
      setOpen(true);
    };
    const handleModalClose = () => {
      setOpen(false);
    };
    
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
            <MainActionContainer 
                data={pageType.penalty} 
                dataSet={PenaltyData} 
                dataSetHeaders={PenaltyTableHeader} 
            />
            <Table rows= {PenaltyData} tableHeader ={ PenaltyTableHeader }/>
            <Paginator />

            <Modal handleClickOpen={handleModalOpen} handleClose={handleModalClose} open={open} />
        </div>

    );



}
