import { Button, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react'
import {useStyles} from './style'
import BreadCrumb from '../../BreadCrump';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Close } from '@material-ui/icons';
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import ProgressSpinner from '../../ProgressBarSpinner'
import { setNewVehicle } from '../../../../store/reducers/vehicle/vehicle.actions';
import { CLEAR_VEHICLE_ERROR, CLEAR_VEHICLE_MESSAGE } from '../../../../store/reducers/vehicle/vehicle.types';

export default (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const { register, handleSubmit, formState:{ errors } } = useForm()
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const vehicleReducer = useSelector((state) => state.vehicleReducer)
    const authReducer = useSelector((state) => state.authReducer)


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
            name: "owner_name"

        },
        {
            placeholder: "Surname",
            name: "owner_surname"

        },
        {
            placeholder: "Duty location",
            name: "duty_location"
        },{
            placeholder: "unit",
            name: "unit"
        }
    ]


    const onSubmit = (data)=> {
        //handleBackdropToggle()
        if('id' in authReducer.data) {

            dispatch(setNewVehicle(data, authReducer.data.id, navigate))
        }
    }

    if(vehicleReducer.message) {
      showSnackBar(vehicleReducer.message, 'success');
      dispatch({ type: CLEAR_VEHICLE_MESSAGE})
    }

    if(vehicleReducer.error) {

        if("errors" in vehicleReducer.error) {
            for (const key in vehicleReducer.error.errors) {

                showSnackBar(vehicleReducer.error.errors[key]["0"], 'error');
                
            }
        }else if("error" in vehicleReducer.error) {

            showSnackBar(vehicleReducer.error.error, 'error');
        }

        
        dispatch({ type: CLEAR_VEHICLE_ERROR})
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
    }

    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                <Typography className={classes.header}>Add New Vehicle</Typography>

                <form  onSubmit={handleSubmit(onSubmit)}>
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
                                            {...register(item.name, { required: true })}
                                        />
                                        {errors[item.name] && <span>This field is required</span>}
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
                            <Button type="submit" variant="contained" color="primary" className={classes.submitBtn} >
                                {
                                    vehicleReducer.loading?
                                        <ProgressSpinner />

                                    :"Add Vehicle"
                                }
                                
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );


    
}
