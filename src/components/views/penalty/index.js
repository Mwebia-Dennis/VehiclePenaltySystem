import React, { useEffect,useState } from 'react'
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
import { getAllPenalties, searchPenaltiesData } from '../../../store/reducers/penalty/penalty.actions';
import ProgressBarSpinner from '../../shared_components/ProgressBarSpinner'
import Alert from '@material-ui/lab/Alert';

export default (props) => {

    
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch()
    const penaltyReducer = useSelector((state) => state.penaltyReducer)
    const penaltyData = useSelector((state) => state.penaltyReducer.data)
    const [sortingValues, setSortingValues] = useState({
        sortBy: 'created_at',
        limitEntries:25,
        page: 1
    })

    function handleModalOpen(){
        console.log('clicked')
      setOpen(true);
    };
    const handleModalClose = () => {
      setOpen(false);
    };
    
    
    useEffect(() => {
        
        dispatch(getAllPenalties(sortingValues.sortBy, sortingValues.page, sortingValues.limitEntries))

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
            url:"/penalty", 
            name: "Penalty"
        }
        
    ]

    const handleRefreshPage = ()=> {

        dispatch(getAllPenalties())
    }
    const handleSearching = (data)=> {

        if(data.query != '') {
            const formData = new FormData()
            formData.append('column', data.column.toLowerCase())
            formData.append('value', data.query.toLowerCase())

            dispatch(searchPenaltiesData(formData))
        }else {
            handleRefreshPage()
        }
    }
        
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

    const formatMoreData = () => {

        const headers = getTableHeaders(formatData( penaltyData.data))
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
        if(headers.includes('penalty_date')) {
            const index = headers.indexOf('penalty_date');
            if (index > -1) {
                headers.splice(index, 1);
            }
        }
        if(headers.includes('payment_date')) {
            const index = headers.indexOf('payment_date');
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

        const headers = formatMoreData()
        // removing unwanted cols
        
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
        
        data.sortByOptions = formatMoreData();
        data.searchOptions = headers;

        return data;
    }

    return (

        <div>
            <BreadCrumb links={links} />

            {
                penaltyReducer.loading?
                    <ProgressBarSpinner />
                :
                    ("data" in penaltyData)?
                    <>
                        <MainActionContainer 
                            data={formatMainActionData(pageType.penalty)}
                            dataSet={formatData( penaltyData.data)} 
                            dataSetHeaders={getTableHeaders(formatData( penaltyData.data))}
                            sortingValues={sortingValues}
                            handleSearching = {handleSearching}
                            handleRefreshPage={handleRefreshPage}
                            handleLimitEntriesChange={handleLimitEntriesChange}
                            handleSortByChange={handleSortByChange}
                        />
                        <Table rows= {formatData( penaltyData.data)} 
                            tableHeader ={ getTableHeaders(formatData( penaltyData.data)) }/>
                        <Paginator paginationCount={penaltyData.last_page} 
                            handlePagination={handlePagination} 
                            page={ penaltyData.current_page }
                        />

                    </>
                    :
                    <Alert severity="info">0 results found</Alert>
            }

            <Modal handleClose={handleModalClose} open={open} />
        </div>

    );



}
