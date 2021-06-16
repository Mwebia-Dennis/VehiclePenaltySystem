import { Button, Grid, IconButton, Paper, TextField, Typography } from '@material-ui/core';
import React, {forwardRef, useState} from 'react'
import {useStyles} from './style'
import BreadCrumb from '../../BreadCrump';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Close } from '@material-ui/icons';
import { useDispatch,useSelector } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import ProgressSpinner from '../../ProgressBarSpinner'
import { setNewVehicle, updateVehicle } from '../../../../store/reducers/vehicle/vehicle.actions';
import { handleUpdateData, formatDate } from '../../../../utils/functions'
import { vehicleTextFields } from '../../../../utils/constants'
import { CLEAR_VEHICLE_ERROR, CLEAR_VEHICLE_MESSAGE } from '../../../../store/reducers/vehicle/vehicle.types';

export default (props) => {

    const { isUpdate, data } = props;
    const classes = useStyles();
    const dispatch = useDispatch()
    const defaultInputData = (data != null && data != undefined)?data:{}
    const [formInputData, setFormInputData] = useState({})
    // const { register, handleSubmit, formState:{ errors } } = useForm({
    //     defaultValues: handleUpdateData(defaultInputData)
    // })
    const [deliveryDate, setDeliveryDate] = useState(
        ("delivery_date" in defaultInputData)?new Date(defaultInputData.delivery_date):new Date()
    );
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const vehicleReducer = useSelector((state) => state.vehicleReducer)
    const authReducer = useSelector((state) => state.authReducer)
    const textFields = vehicleTextFields


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


    const handleInputChange = (inputName, inputValue)=> {
        const data = formInputData
        data[inputName] = inputValue
        setFormInputData(data)
    }
    const onSubmit = (e)=> {
        e.preventDefault()
        let data = formInputData

        if(data === {} && defaultInputData !== {}){
            showSnackBar("No data has been editted", "info")
            return
            data = defaultInputData
        }else if(data !== {} && defaultInputData !== {}){

            //if the state is not empty and there are default values, 
            //then add un-updated-default-values to data
            const __defaultInputData = handleUpdateData(defaultInputData)
            for (const key in __defaultInputData) {

                if(!(key in data)) {
                    data[key] = __defaultInputData[key]
                }

            }
        }else if(data === {} && defaultInputData === {}){
            showSnackBar("All fields are required", "error")
            return
        }


        data["delivery_date"] = formatDate(new Date(deliveryDate))
        if('id' in authReducer.data) {

            console.log( handleUpdateData(data) )

            if(isUpdate) {
                dispatch(updateVehicle(data, authReducer.data.id, defaultInputData.id))
            }else {
                dispatch(setNewVehicle(data, authReducer.data.id, navigate))
            }
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


    const getTextInputValue = (name)=> {
        return (data != null && data != undefined)?data[name]:''
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


    const ExampleCustomInput = forwardRef(
        ({ value, onClick, name}, ref) => (

            <TextField 
                required 
                ref={ref}
                value={value}
                onClick={onClick}
                className= {classes.textfield}
                fullWidth
                name={name}

            />
        ),
      );

    return (

        <>
            {
                isUpdate?
                <></>
                :
                <BreadCrumb links={links} />
            }
            <Paper className={isUpdate?classes.root1:classes.root} >

                <Typography className={classes.header}>{isUpdate? "Edit ": "Add New "} Vehicle</Typography>

                <form  onSubmit={onSubmit}>
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
                                            type="text"
                                            required 
                                            label={item.placeholder} 
                                            placeholder={item.placeholder}
                                            name={item.name}
                                            className= {classes.textfield}
                                            fullWidth
                                            value={formInputData[item.name]}
                                            defaultValue={getTextInputValue(item.name)}
                                            // {...register(item.name, { required: true })}
                                            onChange={(e)=>handleInputChange(item.name, e.target.value)}
                                        />
                                        {/* {errors[item.name] && <span>This field is required</span>} */}
                                    </Grid>
                                ))
                            }

                            
                            <Grid
                                item 
                                xs={12} 
                                >
                                    <Typography variant="h6" className={classes.label}>Kuruma Teslim Tarihi ve Saati</Typography>
                                    <DatePicker 
                                        selected={deliveryDate}
                                        customInput={<ExampleCustomInput />}
                                        onChange={date => setDeliveryDate(date)}
                                        label="CEZA TARİHİ"
                                        name="delivery_date"
                                    />
                            </Grid>
                            

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
