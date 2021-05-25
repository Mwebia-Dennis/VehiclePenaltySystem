
import { Button,  Paper, Grid, TextField, Typography, IconButton, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React from 'react'
import {useStyles} from '../new_vehicle/style'
import "react-datepicker/dist/react-datepicker.css";
import { Close } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import {DropzoneArea} from 'material-ui-dropzone'
import BreadCrumb from '../../BreadCrump';

export default (props) => {

    const { title } = props;
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const plate_numbers = ["sdsdsdsd 12312", "sdwe2323", "432ewds", "wer2342", "34sdfasd"];

    
    const handleSubmit = () =>{
        
        showSnackBar('System Under Construction', 'error');
    }

      function showSnackBar(msg, variant = 'info'){
        enqueueSnackbar(msg, {
            variant: variant,            
            action: (key) => (
                <IconButton style={{color: '#fff'}} size="small" onClick={() => closeSnackbar(key)}>
                    <Close />
                </IconButton>
            ),
        })
        
        setTimeout(closeSnackbar, 5000)
    }


    const data = JSON.parse(localStorage.getItem("new_menu"));


    const textFields = data.fields.split(',').map((item)=>(
        {
            placeholder: item,
            name: item,
            type: "text"

        }
    ))

    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/auto/data/"+title, 
            name: title
        },
        {
            url:"/auto/form/"+title, 
            name: "add new "+ title
        }
        
    ]
    

    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                <Typography className={classes.header}>Vehicle Penalty</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">add new {title}</Typography>
                <Grid 
                    container 
                    spacing={2}
                    style={{marginTop: '10px'}}
                >

                    <Grid
                        item
                        xs={12}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Plate Number</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                >

                                    {
                                        plate_numbers.map((item,index)=>(
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                    </Grid>

                        
                    {
                        textFields.map((item, index)=>(

                            <Grid 
                                item 
                                xs={12}
                                key={index}                                
                            >
                                <TextField 
                                    required 
                                    label={item.placeholder} 
                                    placeholder={item.placeholder}
                                    name={item.name}
                                    className= {classes.textfield}
                                    fullWidth
                                />
                            </Grid>
                        ))
                    }    


                    <Grid
                        item 
                        xs={12}
                    >

                        <Typography variant="h6" className={classes.label} style={{marginBottom: '10px'}}>PDF document</Typography>
                        <DropzoneArea
                            acceptedFiles={['application/pdf']}
                            showPreviews={true}
                            useChipsForPreview
                            showPreviewsInDropzone={false}
                            maxFileSize={5000000}
                            filesLimit={1}
                            dropzoneText="Drag And Drop PDF document here"
                        />

                    </Grid>                  

                </Grid>

                <Grid
                        container            
                        direction="column"
                        alignItems="center"
                        justify="center"
                >
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.submitBtn} >
                            Submit
                        </Button>

                    </Grid>
                </Grid>
            </Paper>
        </>
    );


    
}
