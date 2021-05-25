import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import NewMenu from './new_menu'
import NewMenuFields from './new_menu_fields'

export default (props) => {
    
    const navigate = useNavigate();
    const [pageType, setPageType] = useState({
        pageType: 'new_menu',
        menu: '',
    })

    const addPageType = (value) => {
        setPageType(value)
    }



    const handlePageType = () => {
        if(pageType.pageType == 'new_menu') { 
            return (<NewMenu handlePageType={addPageType}/>)
        }else if(pageType.pageType == 'new_menu_fields') {
            return (<NewMenuFields handlePageType={addPageType} menu={pageType.menu} />)
        }else {
            navigate('/404')
        }
    }

    // return (handlePageType());
    
    return (handlePageType())

    
}
