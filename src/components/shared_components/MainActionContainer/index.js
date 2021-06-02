import { FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Paper, Select, Typography } from '@material-ui/core'
import { Add, Print, Settings } from '@material-ui/icons';
import React, { useState } from 'react'
import { useStyles,ActionButton,BootstrapInput } from './style';
import { pageType } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import ColumnSelectionModal from '../columnSelectionModal';



export default (props) => {

    const { data, dataSet, dataSetHeaders } = props;
    const classes = useStyles();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [columnSelectionOpen, setColumnSelectionOpen] = useState(false);
    const searchOptions = data.searchOptions;
    const limitEntriesData = ["10", "25", "50", "100"];
    const sortByData = data.sortByOptions;
    const isMenuOpen = Boolean(anchorEl);
    const [limitEntries, setLimitEntries] = useState(limitEntriesData["0"]);
    const [sortBy, setSortBy] = useState(sortByData["0"]);
    const [searchQuery, setSearchQuery] = useState(searchOptions["0"]);
    console.log(data)



    const handleFormOpen = () => {

        //data

        console.log("data")
        console.log(data)

        if(data === pageType.vehicle ) {
            navigate('/new-vehicle');
        }else if(data === pageType.users ) {
            navigate('/new-user');
        }else if(data === pageType.penalty ) {
            navigate('/new-penalty');
        }else {

            localStorage.setItem("menu_id", data.menu_id)
            navigate('/auto/form/'+data.type.toLowerCase())
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

    

    const handleColumnSelectionOpen = () => {
        setColumnSelectionOpen(true);
    };

    const handleColumnSelectionClose = () => {
        setColumnSelectionOpen(false);
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


    return (

        <div className={classes.root}>


            <Grid container>
                <Grid item xs={12} md={2}>
                    
                    <ActionButton variant="contained" color="primary" onClick={handleFormOpen}><Add />Add New {data.type}</ActionButton>
                </Grid>
                
                <Grid item xs={12} md={2}>
                      
                    <ActionButton variant="contained" color="primary" onClick={handleColumnSelectionOpen}>
                        <Print />Export to Excel
                    </ActionButton>
                
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

            <ColumnSelectionModal 
                open={columnSelectionOpen} 
                handleClose={handleColumnSelectionClose} 
                dataType={data} 
                dataSet={dataSet} 
                dataSetHeaders={dataSetHeaders}
            />

            {renderMenu}   

        </div>
    );
    
}
