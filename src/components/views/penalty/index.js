import React, { useEffect } from 'react'
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
import { useDispatch,useSelector } from 'react-redux';
import { getAllPenalties } from '../../../store/reducers/penalty/penalty.actions';

export default (props) => {

    
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const penaltyReducer = useSelector((state) => state.penaltyReducer)
    const tableData = formatData(penaltyReducer.data)
    const tableHeaders = getTableHeaders(tableData)

    function handleModalOpen(){
        console.log('clicked')
      setOpen(true);
    };
    const handleModalClose = () => {
      setOpen(false);
    };
    
    
    useEffect(() => {
        
        dispatch(getAllPenalties())

    }, [''])

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
        
    function formatData(data){
        const allData = []
        let formattedData = {}
        for(const key in data) {

            for (const header in data[key]) {

                
                if(header != 'id' && header != 'added_by' && header != 'vehicle' && header != 'vehicle_id') {

                    if(header.trim() == 'pdf_url') {
                    
                        formattedData['pdf'] = <IconButton onClick={handleModalOpen}> 
                                <Avatar alt="pdf logo" variant="square" src={pdf_logo} />
                            </IconButton>
                    }else {
                        formattedData[header] = data[key][header]
                    }
                    
                    formattedData['plate_number'] = data[key]['vehicle']['plate_number']
                }

                
            }
            
            formattedData["action"] = <>
                    <IconButton color="primary"> <Edit /> </IconButton>
                    <IconButton style={{color: '#ff0000'}}> <Delete /> </IconButton>
                </>
            allData.push(formattedData)
            formattedData = {}

        }

        return allData
    }

    function getTableHeaders(data){
        const tableHeaders = ["#"]
        for(const key in data) {
            
            for (const header in data[key]) {
                tableHeaders.push(header)
            }
            break

        }

        return tableHeaders
    }

    return (

        <div>
            <BreadCrumb links={links} />
            <MainActionContainer 
                data={pageType.penalty} 
                dataSet={tableData} 
                dataSetHeaders={tableHeaders} 
            />
            <Table rows= {tableData} tableHeader ={ tableHeaders }/>
            <Paginator />

            <Modal handleClose={handleModalClose} open={open} />
        </div>

    );



}
