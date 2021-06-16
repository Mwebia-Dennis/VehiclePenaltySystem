import React, { useEffect,useState } from 'react'
import Table from '../../shared_components/table';
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import EditDataModal from '../../shared_components/EditDataModal';
import Paginator from '../../shared_components/Paginator';
import { pageType, formTypes, vehicleTextFields }  from '../../../utils/constants'
import { getPlaceHolderName } from '../../../utils/functions'
import { useDispatch,useSelector } from 'react-redux';
import { deleteVehicle, getAllVehicles, searchVehiclesData } from '../../../store/reducers/vehicle/vehicle.actions';
import { Delete, Edit } from '@material-ui/icons';
import { Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import ProgressBarSpinner from '../../shared_components/ProgressBarSpinner'
import Alert from '@material-ui/lab/Alert';

export default (props) => { 
    
    
    
    const dispatch = useDispatch()
    const vehicleReducer = useSelector((state) => state.vehicleReducer)
    const vehicleData = useSelector((state) => state.vehicleReducer.data)
    const authReducer = useSelector((state) => state.authReducer)
    const [selectedData, setSelectedData] = useState('')
    const [editModalOpen, setEditModalOpen] = useState({
        open: false,
        data: {},
    })
    
    const [sortingValues, setSortingValues] = useState({
        sortBy: 'created_at',
        limitEntries:25,
        page: 1
    })
    
    useEffect(() => {
        
        dispatch(getAllVehicles(sortingValues.sortBy, sortingValues.page, sortingValues.limitEntries))

    }, [sortingValues])


    const handleEditDataModalOpen = (data) => {
        setEditModalOpen({
            data: data,
            open:true,
        });
    };

    const handleEditDataModalClose = () => {
        setEditModalOpen({
            ...editModalOpen,
            open:false,
        });
    };

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

    const handleDelete = (vehicle_id)=> {
        if('id' in authReducer.data) {

            dispatch(deleteVehicle(authReducer.data.id, vehicle_id))
        }

    }

    
    function formatData(data){
        const allData = []
        let formattedData = {}
        for(const key in data) {

            formattedData['seç'.toUpperCase()] = <FormControlLabel control={
                <Checkbox name={data[key].id} value={data[key].id} checked={checkIfDataExists(data[key].id)} 
                    onChange={handleCheckBoxChange}/>
            } />
            for (const header in data[key]) {

                

                if(header != 'id' && header != 'added_by') {
                    const placeholder = getPlaceHolderName(header, vehicleTextFields)
                    formattedData[placeholder] = data[key][header]
                }

                
            }
            
            formattedData["AKSİYON".toUpperCase()] = <>
                    <IconButton color="primary" onClick={()=>handleEditDataModalOpen(data[key])}> <Edit /> </IconButton>
                    <IconButton style={{color: '#ff0000'}} onClick={()=>handleDelete(data[key].id)}> <Delete /> </IconButton>
                </>
            allData.push(formattedData)
            formattedData = {}

        }

        return allData
    }

    function getTableHeaders(data){
        const tableHeaders = []
        for(const key in data) {
            
            for (const header in data[key]) {
                tableHeaders.push(header)
            }
            break

        }
        
        tableHeaders.splice(1, 0, "#")

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
        if(headers.includes('select')) {
            const index = headers.indexOf('select');
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

    const toggleCheckingAllCheckboxes = ()=> {

        const __selectedData = selectedData.split(',').length === 1 && selectedData.split(',')["0"]=== ''?[]:selectedData.split(',')
        if(__selectedData.length  === vehicleData.data.length) {
            setSelectedData([''].join())
        }else {
            const selected = vehicleData.data.map((item)=>item.id)
            setSelectedData(selected.join())
        }

    }
    const handleCheckBoxChange = (e)=> {
        const value = e.target.value
        let selected = selectedData.split(',')
        selected = (selected['0'] === "")?[]:selected

        if(checkIfDataExists(e.target.value)) {
            const index = selected.indexOf(value);
            if (index > -1) {
                selected.splice(index, 1);
            }
        }else {
            selected.push(value)
        }
        setSelectedData(selected.join())
    }
    
    function checkIfDataExists(data) {
        return selectedData.split(',').includes(data.toString())
    }
    const formatExcelData = (data) => {
        
        const selected = selectedData.split(',')
        if(!Array.isArray(data)) {
            return []
        }
        return data.filter((item)=> {
            if(selected.includes(item.id.toString())) {
                return item;
            }
        })
    }

    return (

        <>
            <div>

                <BreadCrumb links={links} />
                <MainActionContainer 
                    data={formatMainActionData(pageType.vehicle)}
                    dataSet={formatData(formatExcelData( vehicleData.data))}
                    dataSetHeaders={getTableHeaders(formatData( vehicleData.data))}
                    sortingValues={sortingValues}
                    handleSearching = {handleSearching}
                    handleRefreshPage={handleRefreshPage}
                    handleLimitEntriesChange={handleLimitEntriesChange}
                    handleSortByChange={handleSortByChange}
                    toggleCheckingAllCheckboxes={toggleCheckingAllCheckboxes}
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
                        <EditDataModal 
                            editModalOpen={editModalOpen}
                            handleEditDataModalClose={handleEditDataModalClose}
                            formType={formTypes.newVehicle}
                        />

                    </>
                    :
                    <Alert severity="info">0 results found</Alert>
                }

            </div>

        </>

    );



}
