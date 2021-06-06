import React, { useEffect, useRef, useState } from 'react'
import Table from '../../shared_components/table';
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import { pageType }  from '../../../utils/constants'
import { useDispatch,useSelector } from 'react-redux';
import { getAllUsersData, searchUsersData } from '../../../store/reducers/users/user.actions';
import { Avatar, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import ProgressBarSpinner from '../../shared_components/ProgressBarSpinner'
import Alert from '@material-ui/lab/Alert';

export default (props) => {
    
    
    const dispatch = useDispatch()
    const userReducer = useSelector((state) => state.userReducer)
    const userData = useSelector((state) => state.userReducer.data)

    useEffect(() => {

        dispatch(getAllUsersData())

    }, [''])

    const handlePagination = (page) => {

        dispatch(getAllUsersData('created_at', page, 25))
    }
    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/users", 
            name: "Users"
        }
        
    ]

    function formatData(data){
        const allData = []
        let formattedData = {}
        for(const key in data) {

            for (const header in data[key]) {

                

                if(header != 'id' && header != 'email_verified_at') {
                    if(header.trim().toLowerCase() == 'profile_img') {
                        formattedData['profile_img'] = <Avatar alt={data[key]['name']} src={data[key][header]} />
                    }else {
                        formattedData[header] = data[key][header]
                    }
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

    const handleRefreshPage = ()=> {

        dispatch(getAllUsersData())
    }
    const handleSearching = (data)=> {

        if(data.query != '') {
            const formData = new FormData()
            formData.append('column', data.column.toLowerCase())
            formData.append('value', data.query.toLowerCase())

            dispatch(searchUsersData(formData))
        }else {
            handleRefreshPage()
        }
    }

    const formatMainActionData = (data) => {

        const headers = getTableHeaders(formatData( userData.data))
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
        if(headers.includes('profile_img')) {
            const index = headers.indexOf('profile_img');
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
                    data={formatMainActionData(pageType.users)} 
                    dataSet={formatData( userData.data)} 
                    dataSetHeaders={getTableHeaders(formatData( userData.data))}
                    handleSearching = {handleSearching}
                    handleRefreshPage={handleRefreshPage}
                />

                {
                    userReducer.loading?
                        <ProgressBarSpinner />
                    :
                    ("data" in userData)?
                    <>
                        <Table rows= {formatData( userData.data)} 
                            tableHeader ={ getTableHeaders(formatData( userData.data)) }
                        />
                        <Paginator paginationCount={userData.last_page} 
                            handlePagination={handlePagination} 
                            page={ userData.current_page }
                        />

                    </>
                    :
                    <Alert severity="info">0 results found</Alert>
                }
            </div>

        </>

    );



}
