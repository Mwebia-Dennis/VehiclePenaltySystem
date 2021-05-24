import React from 'react'
import Table from '../../shared_components/table';
// import { PenaltyTableHeader, PenaltyData } from '../../data/PenaltyData'
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import Modal from '../../shared_components/modal';
import { pageType }  from '../../../utils/constants'
import pdf_logo from '../../../images/pdf_logo.jpg'
import { Avatar, Chip, IconButton } from "@material-ui/core";
import { Delete, Edit } from '@material-ui/icons';

export default (props) => {

    
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = () => {
        console.log('clicked')
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

    const PenaltyTableHeader = [
        '#','pdf','Plate Number','Owner', 'penalty_id', 
        'receipt number', 'penalty date', 'payment date', 'payment status', 'action',
    ]
    const PenaltyData = [
    
        {
            pdf: <IconButton onClick={handleModalOpen}> <Avatar alt="pdf logo" variant="square" src={pdf_logo} /></IconButton>,
            plate: 'adadsada',
            owner: 'dennis',
            penalty_id: '23',
            receipt_no: 'dss1212',
            penalty_date: '12/02/2021',
            payment_date: '12/02/2021',
            status: <Chip label="pending" color="secondary"/>,
            action: <>
                    <IconButton color="primary"> <Edit /> </IconButton>
                    <IconButton style={{color: '#ff0000'}}> <Delete /> </IconButton>
                </>
        },
        {
            pdf: <IconButton onClick={handleModalOpen}> <Avatar alt="pdf logo" variant="square" src={pdf_logo} /></IconButton>,
            plate: 'adadsada',
            owner: 'dennis',
            penalty_id: '23',
            receipt_no: 'dss1212',
            penalty_date: '12/02/2021',
            payment_date: '12/02/2021',
            status: <Chip label="paid"/>,
            action: <>
                    <IconButton color="primary"> <Edit /> </IconButton>
                    <IconButton style={{color: '#ff0000'}}> <Delete /> </IconButton>
                </>
        },
        
    ];

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

            <Modal handleClose={handleModalClose} open={open} />
        </div>

    );



}
