import React, { useEffect,useState } from 'react'
import Table from '../../shared_components/table';
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
    const vehicleData = useSelector((state) => state.vehicleReducer.data)
    
    const [sortingValues, setSortingValues] = useState({
        sortBy: 'created_at',
        limitEntries:25,
        page: 1
    })
    
    useEffect(() => {
        
        dispatch(getAllVehicles(sortingValues.sortBy, sortingValues.page, sortingValues.limitEntries))

    }, [sortingValues])

    const handlePagination = (page) => {
        setSortingValues({
            ...sortingValues,
            page: page
        })
    }

    
    const handleLimitEntriesChange = (event) => {
        setSortingValues(
            {
                ...sortingValues,
                limitEntries: event.target.value,
            }
        );
    };

    const handleSortByChange = (event) => {
        setSortingValues(
            {
                ...sortingValues,
                sortBy: event.target.value,
            }
        );
    };
    
        
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

    const formatSortHeaders = () => {

        const headers = getTableHeaders(formatData( vehicleData.data))
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

        return headers;
    }

    const formatMainActionData = (data) => {

        data.sortByOptions = formatSortHeaders();
        return data;
    }


    return (

        <>
            <div>

                <BreadCrumb links={links} />
                <MainActionContainer 
                    data={formatMainActionData(pageType.vehicle)}
                    dataSet={formatData( vehicleData.data)} 
                    dataSetHeaders={getTableHeaders(formatData( vehicleData.data))}
                    sortingValues={sortingValues}
                    handleSearching = {handleSearching}
                    handleRefreshPage={handleRefreshPage}
                    handleLimitEntriesChange={handleLimitEntriesChange}
                    handleSortByChange={handleSortByChange}
                />
                {
                    vehicleReducer.loading?
                        <ProgressBarSpinner />
                    :("data" in vehicleData)?
                    <>
                        
    
                        <Table rows= {formatData( vehicleData.data)} 
                            tableHeader ={ getTableHeaders(formatData( vehicleData.data)) }/>
                        <Paginator paginationCount={vehicleData.last_page} 
                            handlePagination={handlePagination} 
                            page={ vehicleData.current_page }
                        />

                    </>
                    :
                    <Alert severity="info">0 results found</Alert>
                }

            </div>

        </>

    );



}
