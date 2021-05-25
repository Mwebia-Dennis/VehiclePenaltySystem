import React from 'react'
import Table from '../../shared_components/table';
// import { PenaltyTableHeader, PenaltyData } from '../../data/PenaltyData'
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import Modal from '../../shared_components/modal';
import pdf_logo from '../../../images/pdf_logo.jpg'
import { Avatar, Chip, IconButton } from "@material-ui/core";
import { Delete, Edit } from '@material-ui/icons';
import { useParams } from 'react-router';

export default (props) => {

    
    const { page_type } = useParams();
    const [open, setOpen] = React.useState(false);
    const handleModalOpen = () => {
        console.log('clicked')
      setOpen(true);
    };
    const handleModalClose = () => {
      setOpen(false);
    };
    
    const TableHeader = [
        '#','pdf','Plate Number','Owner', 'penalty_id', 
        'receipt number', 'penalty date', 'payment date', 'payment status', 'action',
    ]
    
    const pageType = {
        type: page_type.toUpperCase(),
        sortByOptions: [
            "Name",
            "creation date"
        ],
        searchOptions: ["Name"],
    };
    const Data = [
    
        
    ];

    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/auto/data/"+page_type, 
            name: page_type
        }
        
    ]

    return (

        <div>
            <BreadCrumb links={links} />
            <MainActionContainer 
                data={pageType} 
                dataSet={Data} 
                dataSetHeaders={TableHeader} 
            />
            <Table rows= {Data} tableHeader ={ TableHeader }/>
            <Paginator />

            <Modal handleClose={handleModalClose} open={open} />
        </div>

    );



}
