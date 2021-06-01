import React, { useEffect } from 'react'
import Table from '../../shared_components/table';
import MainActionContainer from '../../shared_components/MainActionContainer';
import BreadCrumb from '../../shared_components/BreadCrump';
import Paginator from '../../shared_components/Paginator';
import { pageType }  from '../../../utils/constants'
import { useDispatch,useSelector } from 'react-redux';
import { getAllUsersData } from '../../../store/reducers/users/user.actions';
import { Avatar, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import ProgressBarSpinner from '../../shared_components/ProgressBarSpinner'

export default (props) => {
    
    
    const dispatch = useDispatch()
    const userReducer = useSelector((state) => state.userReducer)
    const tableData = formatData(userReducer.data)
    const tableHeaders = getTableHeaders(tableData)

    

    useEffect(() => {
        
        dispatch(getAllUsersData())

    }, [])

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

    return (

        <>
            <div>
                <BreadCrumb links={links} />
                <MainActionContainer 
                    data={pageType.users} 
                    dataSet={tableData} 
                    dataSetHeaders={tableHeaders} 
                />

                {
                    userReducer.loading?
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
