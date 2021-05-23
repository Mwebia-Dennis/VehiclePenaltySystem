import { Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react'
import {useStyles} from './style'
import BreadCrumb from '../../BreadCrump';

export default (props) => {

    const classes = useStyles();

    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/vehicle", 
            name: "Vehicle"
        },
        {
            url:"/new-vehicle", 
            name: "Add-New-Vehicle"
        }
        
    ]

    const textFields = [
        {
            placeholder: "Plate Number",
            name: "plate_number"

        },
        {
            placeholder: "Name",
            name: "name"

        },
        {
            placeholder: "Surname",
            name: "surname"

        },
        {
            placeholder: "Duty location",
            name: "duty_location"
        },{
            placeholder: "unit",
            name: "unit"
        }
    ]

    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                <Typography className={classes.header}>Add New Vehicle</Typography>
                <Grid 
                    container 
                    spacing={2}
                >

                        
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
                        

                </Grid>

                <Grid
                        container            
                        direction="column"
                        alignItems="center"
                        justify="center"
                >
                    <Grid item xs={8}>
                        <Button variant="contained" color="primary" className={classes.submitBtn} >
                                Submit
                        </Button>

                    </Grid>
                </Grid>
            </Paper>
        </>
    );


    
}
