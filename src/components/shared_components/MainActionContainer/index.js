import { Button, FormControl, Grid, IconButton, InputLabel, Menu, MenuItem, Paper, Select, Typography } from '@material-ui/core'
import { Add, Print, Refresh, Settings } from '@material-ui/icons';
import React, { useState } from 'react'
import { useStyles,ActionButton,BootstrapInput } from './style';
import { pageType } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import ColumnSelectionModal from '../columnSelectionModal';
import SearchBar from "material-ui-search-bar";
import { useDispatch } from 'react-redux';
import { getUserData, searchUsersData } from '../../../store/reducers/users/user.actions';
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
        handleLimitEntriesChange 
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [columnSelectionOpen, setColumnSelectionOpen] = useState(false);
    const [searchQueryValue, setSearchQueryValue] = useState('')
    const searchOptions = data.searchOptions;
    const limitEntriesData = ["10", "25", "50", "100"];
    const sortByData = data.sortByOptions;
    const isMenuOpen = Boolean(anchorEl);
    const [searchQuery, setSearchQuery] = useState('');

    console.log(data)


    if(searchQuery == '' && data.searchOptions.length > 0) {
        setSearchQuery(data.searchOptions["0"])
    }
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
        handleSearching({column: searchQuery, query: searchQueryValue})
    }

    const handleSearchQueryChange = (value) => {
        handleMenuClose()
        setSearchQuery(value);
        
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


    function formatUrlName(name) {

        //used to remove slashes ( '/' ) incase menu name has a slash character eg(debit/receipt)
        const nameParts = name.split("/")
        if(nameParts.length > 0) {
            return nameParts.join('___')
        }
        return name

    }

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


            <Grid container spacing={1}>
                <Grid item xs={3} md={1}>
                    
                    <IconButton 
                        variant="contained" 
                        color="primary"
                        onClick={handleFormOpen}
                    ><Add /> {/*data.type*/}</IconButton>
                </Grid>
                
                <Grid item xs={3} md={1}>
                      
                    <IconButton variant="contained" 
                        color="primary" 
                        onClick={handleColumnSelectionOpen}
                    >
                       <Print />
                    </IconButton>
                
                </Grid><Grid item xs={3} md={1}>
                      
                      <IconButton variant="contained" 
                          color="primary" 
                          onClick={handleRefreshPage}
                      >
                         <Refresh />
                      </IconButton>
                  
                  </Grid>
                <Grid item xs={12} md={4}>
                    {/* <input type="text" style={{width: '80%', padding: '10px'}} 
                        placeholder={"Search by "+searchQuery}
                        onChange={handleSearchBarChange}
                        value={searchQueryValue}
                        /> */}


                        <Grid container>

                            <Grid item xs={9}>
                                <SearchBar
                                    value={searchQueryValue}
                                    onChange={(newValue) => handleSearchBarChange(newValue)}
                                    onRequestSearch={handleSearchButtonClick}
                                    placeholder={"Search by "+searchQuery}
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

                            <Grid item xs={2}>
 
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
                <Grid item xs={12} md={3}>
                
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

            {renderMenu}   

        </div>
    );
    
}
