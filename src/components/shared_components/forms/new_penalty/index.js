
import { Button, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import React, { forwardRef, useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';   
import {useStyles} from './style'
import BreadCrumb from '../../BreadCrump';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { paymentStatus } from '../../../../utils/constants';
import {DropzoneArea} from 'material-ui-dropzone'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Close } from '@material-ui/icons';
import { useDispatch,useSelector } from 'react-redux';
import ProgressSpinner from '../../ProgressBarSpinner'
import { getAllVehiclesPlateNumber } from '../../../../store/reducers/vehicle/vehicle.actions';
import { CLEAR_PENALTY_ERROR, CLEAR_PENALTY_MESSAGE } from '../../../../store/reducers/penalty/penalty.types';
import { setNewPenalty, updatePenalty } from '../../../../store/reducers/penalty/penalty.actions';
import { handleUpdateData, formatDate } from '../../../../utils/functions'
import { penaltyTextFields } from '../../../../utils/constants'

export default function NewPenaltyForm(props) {

    const { isUpdate, data } = props;
    const classes = useStyles();
    const defaultInputData = (data !== null && data !== undefined)?data:{}
    const [formInputData, setFormInputData] = useState({})
    const [plateNumber, setPlateNumber] = useState(
        ("vehicle" in defaultInputData)?{
            id: defaultInputData.vehicle.id,
            plate_number: defaultInputData.vehicle.plate_number
        }:{}
    );
    const [penaltyDate, setPenaltyDate] = useState(
        ("penalty_date" in defaultInputData)?new Date(defaultInputData.penalty_date):new Date()
    );
    const [paymentDate, setPaymentDate] = useState(
        ("payment_date" in defaultInputData)?new Date(defaultInputData.payment_date):new Date()
    );
    const [notificationDate, setNotificationDate] = useState(
        ("notification_date" in defaultInputData)?new Date(defaultInputData.notification_date):new Date()
    );
    const [penaltyHour, setPenaltyHour] = useState(new Date());
    const [fileError, setFileError] = useState('')
    const [uploadedPdf, setUploadedPdf] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const penaltyReducer = useSelector((state) => state.penaltyReducer)
    const authReducer = useSelector((state) => state.authReducer)
    const vehicleReducer = useSelector((state) => state.vehicleReducer)
    const textFields = penaltyTextFields



    useEffect(() => {
        
        dispatch(getAllVehiclesPlateNumber())
    }, [])

    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/penalty", 
            name: "Penalties"
        },
        {
            url:"/new-penalty", 
            name: "Add-New-Penalty"
        }
        
    ]


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


    const handleFileChange = (files) => {
        setUploadedPdf(files["0"])
    }

    
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

        if(plateNumber === '') {
            showSnackBar("Plate Number is required", "error")
            return
        }
        
                    
        const formData = new FormData()
        formData.append("vehicle_id", plateNumber.id)
        formData.append("penalty_date", formatDate(new Date(penaltyDate)))
        formData.append("payment_date", formatDate(new Date(paymentDate)))
        formData.append("notification_date", formatDate(new Date(notificationDate)))
        formData.append("penalty_hour", (new Date(penaltyHour).toLocaleTimeString('it-IT')))
        for (const key in data) {
            
            formData.append(key, data[key])
        }

        if(!isUpdate) {

            if( uploadedPdf !== null) {

                if(("name" in uploadedPdf)) {
    
                    formData.append('pdf', uploadedPdf,uploadedPdf.name)
                }else {
    
                    setFileError('This field is required')
                    return
                }
            }else {
    
                setFileError('This field is required')
                return
            }
        }

        
        if('id' in authReducer.data) {
    
            if(isUpdate) {
                dispatch(updatePenalty(data, authReducer.data.id, defaultInputData.id))
            }else {
                dispatch(setNewPenalty(formData, authReducer.data.id, navigate))
            }
        }


    }

    if(penaltyReducer.message) {
      showSnackBar(penaltyReducer.message, 'success');
      dispatch({ type: CLEAR_PENALTY_MESSAGE})
    }

    if(penaltyReducer.error) {

        if("errors" in penaltyReducer.error) {
            for (const key in penaltyReducer.error.errors) {

                showSnackBar(penaltyReducer.error.errors[key]["0"], 'error');
                
            }
        }else if("error" in penaltyReducer.error) {

            showSnackBar(penaltyReducer.error.error, 'error');
        }

        
        dispatch({ type: CLEAR_PENALTY_ERROR})
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

    const getTextInputValue = (name)=> {
        return (data !== null && data !== undefined)?data[name]:''
    }
 
    return (

        <>
            
            {
                isUpdate?
                <></>
                :
                <BreadCrumb links={links} />
            }
            <Paper className={isUpdate?classes.root1:classes.root} >

                
                <form onSubmit={onSubmit}>
                    <Typography className={classes.header}>Yeni Metin Belgesi</Typography>
                    <Grid 
                        container 
                        spacing={2}
                    >
                        <Grid 
                            item 
                            xs={12}                              
                        >

                            {

                                vehicleReducer.loading?

                                    <ProgressSpinner />
                                
                                :
                                
                                    (vehicleReducer.allVehiclePlates.length > 0)?
                                        <FormControl className={classes.formControl}>
                                            
                                            <Autocomplete
                                                id="plate_number"
                                                options={vehicleReducer.allVehiclePlates}
                                                getOptionLabel={(option) => option.plate_number}
                                                style={{ width: '100%' }}
                                                value={plateNumber}
                                                disabled={isUpdate}
                                                onChange={(event, newValue) => {
                                                setPlateNumber(newValue);
                                                }}
                                                renderInput={(params) => <TextField required {...params} label="Plaka No" margin="normal" />}
                                            />

                                        </FormControl>
                                    :
                                    <div>O results found</div>
                                
                            }
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
                                            defaultValue={getTextInputValue(item.name)}
                                            onChange={(e)=>handleInputChange(item.name, e.target.value)}
                                            // {...register(item.name, { required: true })}
                                        />
                                        {/* {errors[item.name] && <span>This field is required</span>} */}
                                    </Grid>
                                ))
                            }

                            <Grid
                                item 
                                xs={12} 
                                md={6} 
                                >
                                    <Typography variant="h6" className={classes.label}>CEZA TARİHİ</Typography>
                                    <DatePicker 
                                        selected={penaltyDate}
                                        customInput={<ExampleCustomInput />}
                                        onChange={date => setPenaltyDate(date)}
                                        label="CEZA TARİHİ"
                                        name="penalty_date"
                                    />
                                    {/* {errors["penalty_date"] && <span>This field is required</span>} */}
                            </Grid>
                            <Grid
                                item 
                                xs={12}
                                md={6}
                            >
                                    <Typography variant="h6" className={classes.label}>ÖDEME TARİHİ</Typography>
                                    <DatePicker 
                                        selected={paymentDate}
                                        customInput={<ExampleCustomInput />}
                                        onChange={date => setPaymentDate(date)}
                                        label="ÖDEME TARİHİ"
                                        placeholder="ÖDEME TARİHİ"
                                        name="payment_date"
                                    />
                                    {/* {errors["payment_date"] && <span>This field is required</span>} */}
                            </Grid>
                            <Grid
                                item 
                                xs={12}
                                md={6}
                            >
                                    <Typography variant="h6" className={classes.label}>TEBLİG TARİHİ</Typography>
                                    <DatePicker 
                                        selected={notificationDate}
                                        customInput={<ExampleCustomInput />}
                                        onChange={date => setNotificationDate(date)}
                                        label="TEBLİG TARİHİ"
                                        placeholder="TEBLİG TARİHİ"
                                        name="notification_date"
                                    />
                                    {/* {errors["notification_date"] && <span>This field is required</span>} */}
                            </Grid>
                            <Grid
                                item 
                                xs={12}
                                md={6}
                            >
                                    <Typography variant="h6" className={classes.label}>CEZA-SAAT</Typography>
                                    <DatePicker 
                                        selected={penaltyHour}
                                        customInput={<ExampleCustomInput />}
                                        onChange={date => setPenaltyHour(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={1}
                                        dateFormat="hh:mm:ss "
                                        label="CEZA-SAAT"
                                        placeholder="CEZA-SAAT"
                                        name="penalty_hour"
                                    />
                                    {/* {errors["penalty_hour"] && <span>This field is required</span>} */}
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                >
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">ÖDEME DURUMU</InputLabel>
                                        <Select
                                            name="status"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // {...register('status',{ required: true })}                                            
                                            onChange={(e)=>handleInputChange('status', e.target.value)}
                                            value={formInputData.status}
                                            defaultValue={getTextInputValue('status')}  
                                        >

                                            {
                                                paymentStatus.map((item,index)=>(
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        {/* {errors["status"] && <span>This field is required</span>} */}
                                    </FormControl>
                            </Grid>


                                {
                                    
                                    (!isUpdate)?

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
                                                    onChange={handleFileChange}
                                                />
                                                <span>{fileError}</span>
                                            

                                        </Grid>

                                    :<></>
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
                            
                            {penaltyReducer.loading ? <ProgressSpinner />: "Submit"}
                        </Button>

                    </Grid>
                    </Grid>
            
                </form>
            </Paper>
        </>
    );


    
}
