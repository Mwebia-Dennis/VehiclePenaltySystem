import React, { useEffect } from 'react'
import Table from '../../shared_components/table';
import { VehicleData, VehicleTableHeader } from '../../data/VehicleData'
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import { pageType }  from '../../../utils/constants'
import { useDispatch,useSelector } from 'react-redux';
import { getAllVehicles, searchVehiclesData } from '../../../store/reducers/vehicle/vehicle.actions';
import { Delete, Edit } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import ProgressBarSpinner from '../../shared_components/ProgressBarSpinner'
import Alert from '@material-ui/lab/Alert';

export default (props) => { 
    
    
    
    const dispatch = useDispatch()
    const vehicleReducer = useSelector((state) => state.vehicleReducer)
    
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


    const handleRefreshPage = ()=> {

        dispatch(getAllVehicles())
    }
    const handleSearching = (data)=> {

        if(data.query != '') {
            const formData = new FormData()
            formData.append('column', data.column.toLowerCase())
            formData.append('value', data.query.toLowerCase())

            dispatch(searchVehiclesData(formData))
        }else {
            handleRefreshPage()
        }
    }

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

    const formatMainActionData = (data) => {

        const headers = getTableHeaders(formatData( vehicleReducer.data))
        // removing unwanted cols
        if(headers.includes('#')) {
            const index = headers.indexOf('#');
            if (index > -1) {
                headers.splice(index, 1);
            }
        }
        if(headers.includes('pdf')) {
            const index = headers.indexOf('pdf');
            if (index > -1) {
                headers.splice(index, 1);
            }
        }
        if(headers.includes('profile')) {
            const index = headers.indexOf('profile');
            if (index > -1) {
                headers.splice(index, 1);
            }
        }
        if(headers.includes('action')) {
            const index = headers.indexOf('action');
            if (index > -1) {
                headers.splice(index, 1);
            }
        }
        if(headers.includes('created_at')) {
            const index = headers.indexOf('created_at');
            if (index > -1) {
                headers.splice(index, 1);
            }
        }
        if(headers.includes('updated_at')) {
            const index = headers.indexOf('updated_at');
            if (index > -1) {
                headers.splice(index, 1);
            }
        }
        
        data.searchOptions = headers;

        return data;
    }

    return (

        <>
            <div>

                <BreadCrumb links={links} />
                <MainActionContainer 
                    data={formatMainActionData(pageType.vehicle)}
                    dataSet={formatData( vehicleReducer.data)} 
                    dataSetHeaders={getTableHeaders(formatData( vehicleReducer.data))}
                    handleSearching = {handleSearching}
                    handleRefreshPage={handleRefreshPage}
                />

                {
                    vehicleReducer.loading?
                        <ProgressBarSpinner />
                    :
                    (vehicleReducer.data.length > 0)?
                    <>
                        <Table rows= {formatData( vehicleReducer.data)} 
                            tableHeader ={ getTableHeaders(formatData( vehicleReducer.data)) }/>
                        <Paginator />

                    </>
                    :
                    <Alert severity="info">0 results found</Alert>
                }

            </div>

        </>

    );



}
