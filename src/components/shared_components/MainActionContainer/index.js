import { Button, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Paper, Select, Tooltip, Typography } from '@material-ui/core'
import { Add, CheckBox, Print, Refresh, Settings } from '@material-ui/icons';
import React, { useState } from 'react'
import { useStyles,ActionButton,BootstrapInput } from './style';
import { pageType } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import ColumnSelectionModal from '../columnSelectionModal';
import SearchBar from "material-ui-search-bar";
import { useDispatch } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';



export default (props) => {

    const { 
        data, 
        dataSet, 
        dataSetHeaders,
        sortingValues,
        handleSearching, 
        handleRefreshPage, 
        handleSortByChange,
        handleLimitEntriesChange,
        toggleCheckingAllCheckboxes
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [columnSelectionOpen, setColumnSelectionOpen] = useState(false);
    const [searchQueryValue, setSearchQueryValue] = useState('')
    const limitEntriesData = ["10", "25", "50", "100"];
    const sortByData = data.sortByOptions;



    const handleFormOpen = () => {

        //data

        if(data === pageType.vehicle ) {
            navigate('/new-vehicle');
        }else if(data === pageType.users ) {
            navigate('/new-user');
        }else if(data === pageType.penalty ) {
            navigate('/new-penalty');
        }else {

            localStorage.setItem("menu_id", data.menu_id)
            navigate('/auto/form/'+formatUrlName(data.type.toLowerCase()))
        }
    }

    const handleSearchBarChange = (value)=> {
        setSearchQueryValue(value)
    }

    const handleSearchButtonClick = ()=> {
        handleSearching({query: searchQueryValue})
    }
  

    const handleColumnSelectionOpen = () => {
        setColumnSelectionOpen(true);
    };

    const handleColumnSelectionClose = () => {
        setColumnSelectionOpen(false);
    };


    function formatUrlName(name) {

        //used to remove slashes ( '/' ) incase menu name has a slash character eg(debit/receipt)
        const nameParts = name.split("/")
        if(nameParts.length > 0) {
            return nameParts.join('___')
        }
        return name

    }


    return (

        <div className={classes.root}>


            <Grid container spacing={1}>
                <Grid item xs={3} md={1}>
                    
                    <Tooltip title="Add New Data" aria-label="add" placement="top">
                            
                        <IconButton 
                            variant="contained" 
                            color="primary"
                            onClick={handleFormOpen}
                        ><Add /> {/*data.type*/}</IconButton>
                    </Tooltip>
                </Grid>
                
                <Grid item xs={3} md={1}>
                     
                    <Tooltip title="Export To Excel" aria-label="export" placement="top">
                        <IconButton variant="contained" 
                            color="primary" 
                            onClick={handleColumnSelectionOpen}
                        >
                        <Print />
                        </IconButton>
                    </Tooltip> 
                
                </Grid>
                <Grid item xs={3} md={1}>
                    
                    <Tooltip title="Refresh Page" aria-label="refresh page" placement="top">   
                        <IconButton variant="contained" 
                            color="primary" 
                            onClick={handleRefreshPage}
                        >
                            <Refresh />
                        </IconButton>
                    </Tooltip>
                  
                </Grid>
                <Grid item xs={3} md={1}>
                    
                    <Tooltip title="Select All Rows" aria-label="select all rows" placement="top">  
                        <IconButton variant="contained" 
                            color="primary" 
                            onClick={toggleCheckingAllCheckboxes}
                        >
                            <CheckBox />
                        </IconButton>

                    </Tooltip>
                  
                  </Grid>
                <Grid item xs={12} md={4}>


                        <Grid container>

                            <Grid item xs={9}>
                                <SearchBar
                                    value={searchQueryValue}
                                    onChange={(newValue) => handleSearchBarChange(newValue)}
                                    onRequestSearch={handleSearchButtonClick}
                                    placeholder={"Search... "}
                                />
                            </Grid>
                            
                            {

                                searchQueryValue != ''?
                                    <Grid item xs={1}>
    
                                        <IconButton
                                            aria-label="show more"
                                            // aria-controls={mobileMenuId}
                                            aria-haspopup="true"
                                            onClick={handleSearchButtonClick}
                                            color="inherit"
                                            className={classes.iconButton}
                                            variant="contained" color="primary"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </Grid>
                                :<></>    
                            }

                        </Grid>

                    
                </Grid>
                <Grid item xs={12} md={2}>
                    <div className={classes.entries}>
                    
                        <Typography variant="small">Showing</Typography>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={sortingValues.limitEntries}
                            onChange={handleLimitEntriesChange}
                            input={<BootstrapInput />}
                            >

                                {
                                
                                    limitEntriesData.map((item, index)=><MenuItem key={index} value={item}>{item}</MenuItem>)
                                
                                }
                        </Select>
                        <Typography variant="small">Entries</Typography> 
                    </div> 
                </Grid>
                <Grid item xs={12} md={2}>
                
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortingValues.sortBy}
                            onChange={handleSortByChange}
                        >


                            {

                                sortByData.map((item, index)=>(
                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    
                </Grid>
            </Grid>

            <ColumnSelectionModal 
                open={columnSelectionOpen} 
                handleClose={handleColumnSelectionClose} 
                dataType={data} 
                dataSet={dataSet} 
                dataSetHeaders={dataSetHeaders}
            />
 

        </div>
    );
    
}
