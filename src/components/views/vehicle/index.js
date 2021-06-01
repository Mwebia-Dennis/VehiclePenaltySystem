import React, { useEffect } from 'react'
import Table from '../../shared_components/table';
import { VehicleData, VehicleTableHeader } from '../../data/VehicleData'
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import { pageType }  from '../../../utils/constants'
import { useDispatch,useSelector } from 'react-redux';
import { getAllVehicles } from '../../../store/reducers/vehicle/vehicle.actions';
import { Delete, Edit } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import ProgressBarSpinner from '../../shared_components/ProgressBarSpinner'

export default (props) => { 
    
    
    
    const dispatch = useDispatch()
    const vehicleReducer = useSelector((state) => state.vehicleReducer)
    const tableData = formatData(vehicleReducer.data)
    const tableHeaders = getTableHeaders(tableData)
    
    useEffect(() => {
        
        dispatch(getAllVehicles())

    }, [''])
        
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

    function formatData(data){
        const allData = []
        let formattedData = {}
        for(const key in data) {

            for (const header in data[key]) {

                

                if(header != 'id' && header != 'added_by') {
                    formattedData[header] = data[key][header]
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

        <>
            <div>

                <BreadCrumb links={links} />
                <MainActionContainer 
                    data={pageType.vehicle} 
                    dataSet={tableData} 
                    dataSetHeaders={tableHeaders} 
                />

                {
                    vehicleReducer.loading?
                        <ProgressBarSpinner />
                    :
                    <>
                        <Table rows= {tableData} tableHeader ={ tableHeaders }/>
                        <Paginator />
                    </>
                }

            </div>

        </>

    );



}
