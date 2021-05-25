import {  Button, Chip, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import { Add, ArrowBack, Close, CloudUpload } from '@material-ui/icons';
import React, { useState } from 'react'
import {useStyles} from '../new_vehicle/style';
import BreadCrumb from '../../BreadCrump';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export default (props) => {

    const { menu, handlePageType } = props
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [fields, setFields] = useState(null);
    const [textFieldValue, setTextFieldValue] = useState('')
    const navigate =  useNavigate()
    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/category/data", 
            name: "New Menu Entry"
        },
        
    ]


    const handleSaveBtnClick = () => {
        const new_menu = {
            menu: menu,
            fields: fields
        }
        localStorage.setItem("new_menu", JSON.stringify(new_menu) );
        showSnackBar('Your menu is: '+menu+ ' and fields are: '+fields, 'success');
        navigate('/auto/data/'+menu)
        
    }

    const showSnackBar = (msg, variant = 'info') => {
        enqueueSnackbar(msg, {
            variant: variant,            
            action: (key) => (
                <IconButton size="small" onClick={() => closeSnackbar(key)}>
                    <Close />
                </IconButton>
            ),
        })
        
        setTimeout(closeSnackbar, 5000)
    }

    const handleTextFieldChange = (event) => {
        setTextFieldValue(event.target.value)
    }

    const handleBackBtnClick = () => {
        handlePageType(
            {
                pageType: 'new_menu',
                menu: '',
            }
        )
    }

    const handleRemoveField = (value) => {
        
        const _fields = fields.split(',')
        if(_fields.includes(value)){
            const i = _fields.indexOf(value);
            if (i > -1) {
                _fields.splice(i, 1);
            }
        }
        setFields(_fields.join());
      };
      const handleAddField = () => {
            
        const _fields = (fields != null)?fields.split(','):[]
        _fields.push(textFieldValue);
        setTextFieldValue('')
        setFields(_fields.join());

      };

    const fieldsToBeDisplayed = (fields != null)?fields.split(','):[];
    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                <Typography className={classes.header}>Add Menu Queries</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">{"Menu:  "+menu}</Typography>
                <Grid
                    container 
                    spacing={2}
                >

                        
                    <Grid 
                        item 
                        xs={12}                                
                    >
                        <TextField
                            required 
                            label={"new_menu_item"} 
                            placeholder={"new_menu_item"}
                            name="new_menu_item"
                            className= {classes.textfield}
                            fullWidth
                            onChange={handleTextFieldChange}
                            value={textFieldValue}
                        />
                        
                    </Grid>  

                    <Grid item xs={12}>

                        {
                            fieldsToBeDisplayed.map((item, index)=>(


                                <Chip
                                    label={item}
                                    onDelete={()=>{handleRemoveField(item)}}
                                    color="primary"
                                    key={index}
                                    style={{margin: '3px'}}
                                />


                            ))
                        }
                           
                        
                    </Grid>

                </Grid>

                <Grid
                        container            
                        direction="column"
                        alignItems="center"
                        justify="center"
                >
                    <Grid item xs={12} md={12}>
                        
                        <Button startIcon={<ArrowBack />} variant="contained" className={classes.submitBtn} onClick={handleBackBtnClick} >
                            Back
                        </Button>
                        <Button startIcon={<Add />} variant="contained" color="secondary" 
                            onClick={()=>{handleAddField()}} className={classes.submitBtn} 
                        >
                            Add To Queries
                        </Button>

                        <Button startIcon={<CloudUpload />} 
                            onClick={handleSaveBtnClick}
                            variant="contained" color="primary" className={classes.submitBtn} >
                            Save
                        </Button>

                    </Grid>
                </Grid>
            </Paper>
        </>
    );
    
}
