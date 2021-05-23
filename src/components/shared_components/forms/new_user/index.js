
import { Button, Divider, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react'
import {useStyles} from './style'
import BreadCrumb from '../../BreadCrump';
import {signUpTextfields} from '../../../../utils/constants';

export default (props) => {

    const classes = useStyles();

    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/users", 
            name: "Users"
        },
        {
            url:"/new-user", 
            name: "Add-New-User"
        }
        
    ]


    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                <Typography className={classes.header}>Add New User</Typography>
                <Grid 
                    container 
                    spacing={2}
                >

                        
                        {
                            signUpTextfields.map((item, index)=>(

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
                                        type={item.type}
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