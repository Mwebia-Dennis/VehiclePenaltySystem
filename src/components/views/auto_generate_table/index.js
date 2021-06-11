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
import { deleteMenuData, getMenuData, searchMenuData_data } from '../../../store/reducers/menu_data/menu_data.actions';
import { Avatar, Checkbox, FormControlLabel, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import EditDataModal from '../../shared_components/EditDataModal';
import { formTypes }  from '../../../utils/constants'
import { formatUrlName }  from '../../../utils/functions'

export default (props) => {


    
    const { menu_id } = useParams();
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const menuReducer = useSelector((state) => state.menuReducer)
    const menuDataReducer = useSelector((state) => state.menuDataReducer)
    const menuData = useSelector((state) => state.menuDataReducer.data)
    const authReducer = useSelector((state) => state.authReducer)
    
    const [sortingValues, setSortingValues] = useState({
        sortBy: 'created_at',
        limitEntries:25,
        page: 1
    })

    const [editModalOpen, setEditModalOpen] = useState({
        open: false,
        data: {},
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
    const handleDelete = (menuData_id)=> {
        if('id' in authReducer.data) {

            dispatch(deleteMenuData(authReducer.data.id, menuData_id, menu_id))
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

    
    const toggleCheckingAllCheckboxes = ()=> {

        const __selectedData = selectedData.split(',').length === 1 && selectedData.split(',')["0"]=== ''?[]:selectedData.split(',')
        if(__selectedData.length  === menuData.data.length) {
            setSelectedData([''].join())
        }else {
            const selected = menuData.data.map((item)=>item.id)
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
        console.log(selectedData.split(','))
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

    function formatData(data){
        const allData = []
        let formattedData = {}
        for(const key in data) {

            const __data = JSON.parse(data[key].data)
            formattedData['select'] = <FormControlLabel control={
                <Checkbox name={data[key].id} value={data[key].id} checked={checkIfDataExists(data[key].id)} 
                    onChange={handleCheckBoxChange}/>
            } />
            for (const header in __data) {

                
                if(header.trim() == 'pdf') {
                    
                    formattedData['pdf'] = <IconButton onClick={handleModalOpen}> 
                            <Avatar alt="pdf logo" variant="square" src={pdf_logo} />
                        </IconButton>
                }else if(header.trim() == 'plate_number') {
                    continue
                }else {
                    formattedData[header] = __data[header]
                }

                
            }
            formattedData["plate_number"] = data[key].vehicle.plate_number
            formattedData["created_at"] = data[key].created_at
            formattedData["updated_at"] = data[key].updated_at
            
            formattedData["action"] = <>
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
        tableHeaders.splice(1, 0, "#");

        return tableHeaders
    }

    return (

        <div>
            <BreadCrumb links={links} />
            <MainActionContainer 
                // data={menuReducer.singleMenuData.name} 
                data={{
                    type: menuReducer.singleMenuData.name,
                    menu_id: menuReducer.singleMenuData.id,
                    sortByOptions: [
                        "created_at",
                        "updated_at"
                    ]
                }}
                dataSet={formatData(formatExcelData( menuData.data))}
                dataSetHeaders={getTableHeaders(formatData( menuData.data))}
                handleSearching = {handleSearching}
                handleRefreshPage={handleRefreshPage}
                sortingValues={sortingValues}
                handleSearching = {handleSearching}
                handleRefreshPage={handleRefreshPage}
                handleLimitEntriesChange={handleLimitEntriesChange}
                handleSortByChange={handleSortByChange}
                toggleCheckingAllCheckboxes={toggleCheckingAllCheckboxes}
            />

            {
                menuDataReducer.loading?
                    <ProgressBarSpinner />
                :

                (!Array.isArray(menuReducer.singleMenuData))?
                    <>


                        {
                            ("data" in menuData)?
                            <>
                                <Table rows= {formatData( menuData.data)} 
                                    tableHeader ={ getTableHeaders(formatData( menuData.data)) }/>
                                <Paginator paginationCount={menuData.last_page} 
                                    handlePagination={handlePagination} 
                                    page={ menuData.current_page }
                                />
                                <EditDataModal 
                                    editModalOpen={editModalOpen}
                                    handleEditDataModalClose={handleEditDataModalClose}
                                    formType={formTypes.autoGenerateForm}
                                    page_type={formatUrlName(menuReducer.singleMenuData.name)}
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
