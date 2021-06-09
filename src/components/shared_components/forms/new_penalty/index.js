
import { Button, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
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
import { useForm } from "react-hook-form";
import ProgressSpinner from '../../ProgressBarSpinner'
import { getAllVehiclesPlateNumber } from '../../../../store/reducers/vehicle/vehicle.actions';
import { CLEAR_PENALTY_ERROR, CLEAR_PENALTY_MESSAGE } from '../../../../store/reducers/penalty/penalty.types';
import { setNewPenalty } from '../../../../store/reducers/penalty/penalty.actions';

export default (props) => {

    const classes = useStyles();
    const [plateNumber, setPlateNumber] = useState('');
    const [plateNumberError, setPlateNumberError] = useState('');
    const [penaltyDate, setPenaltyDate] = useState(new Date());
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [notificationDate, setNotificationDate] = useState(new Date());
    const [penaltyHour, setPenaltyHour] = useState(new Date());
    const [fileError, setFileError] = useState('')
    const [uploadedPdf, setUploadedPdf] = useState(null)
    const dispatch = useDispatch()
    const { register,handleSubmit, formState:{ errors } } = useForm()
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const penaltyReducer = useSelector((state) => state.penaltyReducer)
    const authReducer = useSelector((state) => state.authReducer)
    const vehicleReducer = useSelector((state) => state.vehicleReducer)

    useEffect(() => {
        
        dispatch(getAllVehiclesPlateNumber())
    }, [''])

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

    const textFields = [
        {
            placeholder: "MAKBUZ-NO",
            name: "receipt_number",
            type: "text"

        },
        {
            placeholder: "CEZA MADDE",
            name: "penalty_article",
            type: "text"

        },
        {
            placeholder: "CEZATUTAR ",
            name: "penalty",
            type: "text"

        },
        {
            placeholder: "NOT ",
            name: "note",
            type: "text"

        },
        {
            placeholder: "ÖDEME YAPAN",
            name: "paying",
            type: "text"

        },
        {
            placeholder: "KAYNAK ",
            name: "source",
            type: "text"

        },
        {
            placeholder: "BİRİM  ",
            name: "unit",
            type: "text"

        },
        {
            placeholder: "İADE ID  ",
            name: "return_id",
            type: "text"

        },
        {
            placeholder: "PESİNTUTAR ",
            name: "pesintutar",
            type: "text"

        },
        {
            placeholder: "İDAYSİSID",
            name: "daysisid",
            type: "text"

        },
        {
            placeholder: "DAYSİSONAY",
            name: "daysisonay",
            type: "text"

        },
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

    
    const onSubmit = (data)=> {

        if(plateNumber == '') {
            setPlateNumberError('this field is required')
            return
        }
        if(("name" in uploadedPdf) && uploadedPdf != null) {

            
            const formData = new FormData()
            formData.append('pdf', uploadedPdf,uploadedPdf.name)
            formData.append("vehicle_id", plateNumber.id)
            formData.append("penalty_date", formatDate(new Date(penaltyDate)))
            formData.append("payment_date", formatDate(new Date(paymentDate)))
            formData.append("notification_date", formatDate(new Date(notificationDate)))
            formData.append("penalty_hour", (new Date(penaltyHour).toLocaleTimeString('it-IT')))
            for (const key in data) {
                
                formData.append(key, data[key])
            }
            if('id' in authReducer.data) {

                dispatch(setNewPenalty(formData, authReducer.data.id, navigate))
            }
        }else {

            setFileError('This field is required')
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

    function formatDate(date) {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
      
        return [date.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
               ].join('-');
    }

    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                                onChange={(event, newValue) => {
                                                setPlateNumber(newValue);
                                                }}
                                                renderInput={(params) => <TextField required {...params} label="Plaka No" margin="normal" />}
                                            />
                                            <span>{plateNumberError}</span>

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
                                            {...register(item.name, { required: true })}
                                        />
                                        {errors[item.name] && <span>This field is required</span>}
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
                                    {errors["penalty_date"] && <span>This field is required</span>}
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
                                    {errors["payment_date"] && <span>This field is required</span>}
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
                                    {errors["notification_date"] && <span>This field is required</span>}
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
                                    {errors["penalty_hour"] && <span>This field is required</span>}
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
                                            {...register('status',{ required: true })}
                                        >

                                            {
                                                paymentStatus.map((item,index)=>(
                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        {errors["status"] && <span>This field is required</span>}
                                    </FormControl>
                                </Grid>

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
