import { FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Paper, Select, Typography } from '@material-ui/core'
import { Add, Print, Settings } from '@material-ui/icons';
import React, { useState } from 'react'
import { useStyles,ActionButton,BootstrapInput } from './style';
import { pageType } from '../../../utils/constants'
import { useNavigate } from 'react-router';
import ReactExport from "react-export-excel";



export default (props) => {

    const { data, dataSet, dataSetHeaders } = props;
    const dataSetHeadersIds = [];
    const classes = useStyles();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const searchOptions = data.searchOptions;
    const limitEntriesData = ["10", "25", "50", "100"];
    const sortByData = data.sortByOptions;
    const isMenuOpen = Boolean(anchorEl);
    const [limitEntries, setLimitEntries] = useState(limitEntriesData["0"]);
    const [sortBy, setSortBy] = useState(sortByData["0"]);
    const [searchQuery, setSearchQuery] = useState(searchOptions["0"]);

    for (const __data in dataSet) {
        dataSetHeadersIds.push(__data);
    }

    const handleFormOpen = () => {

        //data

        if(data == pageType.vehicle ) {
            navigate('/new-vehicle');
        }else if(data == pageType.users ) {
            navigate('/new-user');
        }else if(data == pageType.penalty ) {
            navigate('/new-penalty');
        }
    };

    const handleSearchQueryChange = (value) => {
        handleMenuClose()
        setSearchQuery(value);
        
    };

    const handleLimitEntriesChange = (event) => {
        setLimitEntries(event.target.value);
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            {
                searchOptions.map((item, index)=>(
                    <MenuItem 
                        key={index} 
                        onClick={()=>{handleSearchQueryChange(item)}} 
                        value={item}
                    >
                        Search by {item} 
                    </MenuItem>
                ))
            }

        </Menu>
    );

    const ExportToExcelBtn = () => {
        
        return (
            <ExcelFile
                filename={"report"}
                element={
                    <ActionButton variant="contained" color="primary"> 
                        <Print />Export to Excel</ActionButton>
                    }
                >
                <ExcelSheet data={dataSet} name="Employees">

                    {
                        dataSetHeaders.map((item, index) => (

                            <ExcelColumn label={item} value={dataSetHeadersIds[index]} key={index} />
                        ))
                    }
                </ExcelSheet>
            </ExcelFile>
        );
    }

    return (

        <div className={classes.root}>


            <Grid container>
                <Grid item xs={12} md={2}>
                    
                    <ActionButton variant="contained" color="primary" onClick={handleFormOpen}><Add />Add New {data.type}</ActionButton>
                </Grid>
                
                <Grid item xs={12} md={2}>
                    <ExportToExcelBtn />
                </Grid>
                <Grid item xs={12} md={3}>
                    <input type="text" style={{width: '80%', padding: '10px'}} 
                        placeholder={"Search by "+searchQuery}/>

                    
                    <IconButton
                        aria-label="show more"
                        // aria-controls={mobileMenuId}
                        aria-haspopup="true"
                         onClick={handleProfileMenuOpen}
                        color="inherit"
                        className={classes.iconButton}
                        variant="outlined" color="primary"
                    >
                        <Settings />
                    </IconButton>
                </Grid>
                <Grid item xs={12} md={2}>
                    <div className={classes.entries}>
                    
                        <Typography variant="small">Showing</Typography>
                        <Select
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={limitEntries}
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
                <Grid item xs={12} md={3}>
                
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sortBy}
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

            {renderMenu}   

        </div>
    );
    
}
