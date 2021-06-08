import React, { useEffect, useState } from 'react'
import Table from '../../shared_components/table';
// import { PenaltyTableHeader, PenaltyData } from '../../data/PenaltyData'
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import Modal from '../../shared_components/modal';
import pdf_logo from '../../../images/pdf_logo.jpg'
import { useNavigate, useParams } from 'react-router';
import { useDispatch,useSelector } from 'react-redux';
import ProgressBarSpinner from '../../shared_components/ProgressBarSpinner'
import { getMenuInfo } from '../../../store/reducers/menu/menu.actions';
import { getMenuData, searchMenuData_data } from '../../../store/reducers/menu_data/menu_data.actions';
import { Avatar, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

export default (props) => {

    
    const { menu_id } = useParams();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const menuReducer = useSelector((state) => state.menuReducer)
    const menuDataReducer = useSelector((state) => state.menuDataReducer)
    const menuData = useSelector((state) => state.menuDataReducer.data)
    const tableData = formatData(menuData.data)
    const tableHeaders = getTableHeaders(tableData)
    
    const [sortingValues, setSortingValues] = useState({
        sortBy: 'created_at',
        limitEntries:25,
        page: 1
    })

    //checking if menu id is available in db

    if(!Array.isArray(menuReducer.singleMenuData) && Object.keys(menuReducer.singleMenuData).length === 0) {
        //menu is not in db
        navigate('/404')
    }

    useEffect(() => {
        
        dispatch(getMenuInfo(menu_id))
        dispatch(getMenuData(menu_id,sortingValues.sortBy, sortingValues.page, sortingValues.limitEntries))

    }, [sortingValues, menu_id])

    
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
    
    const handleRefreshPage = ()=> {

        dispatch(getMenuData(menu_id))
    }
    
    const handleSearching = (data)=> {

        if(data.query != '') {
            data.menu_id = menu_id
            dispatch(searchMenuData_data(data))
        }else {
            handleRefreshPage()
        }
    }

    function handleModalOpen(){
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
        }
        
    ]

    if(menuReducer.singleMenuData.name) {
        links.push(
            {
                url:"/auto/data/"+menuReducer.singleMenuData.name, 
                name: menuReducer.singleMenuData.name
            }
        )
    }


    function formatData(data){
        const allData = []
        let formattedData = {}
        for(const key in data) {

            const __data = JSON.parse(data[key].data)
            for (const header in __data) {

                
                if(header.trim() == 'pdf') {
                    
                    formattedData['pdf'] = <IconButton onClick={handleModalOpen}> 
                            <Avatar alt="pdf logo" variant="square" src={pdf_logo} />
                        </IconButton>
                }else {
                    formattedData[header] = __data[header]
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

            {
                menuDataReducer.loading?
                    <ProgressBarSpinner />
                :

                (!Array.isArray(menuReducer.singleMenuData))?
                    <>

                        <MainActionContainer 
                            // data={menuReducer.singleMenuData.name} 
                            data={{
                                type: menuReducer.singleMenuData.name,
                                menu_id: menuReducer.singleMenuData.id,
                                sortByOptions: [
                                    "created_at",
                                    "updated_at"
                                ],
                                searchOptions: ["keyword"],
                            }}
                            dataSet={tableData} 
                            dataSetHeaders={tableHeaders} 
                            handleSearching = {handleSearching}
                            handleRefreshPage={handleRefreshPage}
                            sortingValues={sortingValues}
                            handleSearching = {handleSearching}
                            handleRefreshPage={handleRefreshPage}
                            handleLimitEntriesChange={handleLimitEntriesChange}
                            handleSortByChange={handleSortByChange}
                        />

                        {
                            ("data" in menuData)?
                            <>
                                <Table rows= {formatData( menuData.data)} 
                                    tableHeader ={ getTableHeaders(formatData( menuData.data)) }/>
                                <Paginator paginationCount={menuData.last_page} 
                                    handlePagination={handlePagination} 
                                    page={ menuData.current_page }
                                />

                            </>
                            :
                            <Alert severity="info">0 results found</Alert>
                        }
                        <Modal handleClose={handleModalClose} open={open} />

                    </>
                :
                <></>

            }

            
        </div>

    );



}
