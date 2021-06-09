
import { Button,  Paper, Grid, TextField, Typography, IconButton, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useStyles} from '../new_vehicle/style'
import "react-datepicker/dist/react-datepicker.css";
import { Close } from '@material-ui/icons';
import { useSnackbar } from 'notistack';
import {DropzoneArea} from 'material-ui-dropzone'
import BreadCrumb from '../../BreadCrump';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import ProgressSpinner from '../../ProgressBarSpinner'
import { getAllVehiclesPlateNumber } from '../../../../store/reducers/vehicle/vehicle.actions';
import { getAllMenuEntries } from '../../../../store/reducers/menu/menu.actions';
import { setNewMenuData } from '../../../../store/reducers/menu_data/menu_data.actions';
import { CLEAR_MENU_DATA_ERROR, CLEAR_MENU_DATA_MESSAGE } from '../../../../store/reducers/menu_data/menu_data.types';

export default (props) => { 

    const { title } = props;
    const classes = useStyles();
    const [plateNumber, setPlateNumber] = useState('');
    const [plateNumberError, setPlateNumberError] = useState('');
    const [uploadedPdf, setUploadedPdf] = useState(null)
    const [fileError, setFileError] = useState('')
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { register,handleSubmit, formState:{ errors } } = useForm()
    const authReducer = useSelector((state) => state.authReducer)
    const menuReducer = useSelector((state) => state.menuReducer)
    const vehicleReducer = useSelector((state) => state.vehicleReducer)
    const menuDataReducer = useSelector((state) => state.menuDataReducer)
    const menu_id = localStorage.getItem("menu_id")

    useEffect(() => {
        
        dispatch(getAllVehiclesPlateNumber())
        dispatch(getAllMenuEntries(menu_id))
    }, [''])


    useEffect(() => {
        if(!menu_id) {
            console.log("sfdsdfsd")
            showSnackBar('Sorry invalid data provided, contact admin for more info', 'error')
            navigate('/home')
        }
    }, [''])
    

    const handleFileChange = (files) => {
        setUploadedPdf(files["0"])
    }

    const onSubmit = (data) =>{
        
        if(plateNumber == '') {
            setPlateNumberError('this field is required')
            return
        }
        if(("name" in uploadedPdf) && uploadedPdf != null) {

            const formData = new FormData()
            formData.append("vehicle_id", plateNumber.id)
            formData.append('pdf', uploadedPdf,uploadedPdf.name)
            formData.append('data', JSON.stringify(formatDataHeaders(data)) )
            formData.append('menu_id', menu_id)

            if('id' in authReducer.data) {

                dispatch(setNewMenuData(formData, authReducer.data.id, navigate))
            }
        }else {

            setFileError('This field is required')
        }
    }


    
    if(menuDataReducer.message) {
        showSnackBar(menuDataReducer.message.message, 'success');
        dispatch({ type: CLEAR_MENU_DATA_MESSAGE})
    }

    if(menuDataReducer.error) {

        if("errors" in menuDataReducer.error) {
            
            for (const key in menuDataReducer.error.errors) {

                showSnackBar(menuDataReducer.error.errors[key]["0"], 'error');
                
            }
        }else if("error" in menuDataReducer.error) {

            showSnackBar(menuDataReducer.error.error, 'error');
        }else if("message" in menuDataReducer.error) {

            showSnackBar(menuDataReducer.error.message, 'error');
        }

        
        // dispatch({ type: CLEAR_MENU_DATA_ERROR})
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
    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/auto/data/"+menu_id, 
            name: reverseUrlName(title)
        },
        {
            url:"/auto/form/"+title, 
            name: "add new "+ reverseUrlName(title)
        }
        
    ]

    function reverseUrlName(name) {

        //used to add back slashes ( '/' ) incase menu name has a underscores character eg(debit___receipt)
        const nameParts = name.split("___")
        if(nameParts.length > 0) {
            return nameParts.join('/')
        }
        return name

    }

    function formatInputName(name) {

        //some turkish words have dots, so remove dots to avoid javasript error
        const nameParts = name.split(".")
        if(nameParts.length > 0) {
            return nameParts.join('___')
        }
        return name

    }

    function formatDataHeaders(data) {
        const newData = {}
        for (const key in data) {
            const keyParts = key.split("___")
            if(keyParts.length > 0) {
                newData[keyParts.join('.')] = data[key]
            }else {
                newData[key] = data[key]
            }
        }


        return newData
    }
    

    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                <Typography className={classes.header}>Vehicle Penalty</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">add new {reverseUrlName(title)}</Typography>

                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid 
                        container 
                        spacing={2}
                        style={{marginTop: '10px'}}
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
                                            <FormControl style={{ width: '100%' }}>
                                                
                                                <Autocomplete
                                                    id="plate_number"
                                                    options={vehicleReducer.allVehiclePlates}
                                                    getOptionLabel={(option) => option.plate_number}                                                    
                                                    value={plateNumber}
                                                    onChange={(event, newValue) => {
                                                    setPlateNumber(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField 
                                                        required {...params} label="Plaka No" margin="normal"
                                                        fullWidth
                                                    />}
                                                />
                                                <span>{plateNumberError}</span>

                                            </FormControl>
                                        :
                                        <div>O results found</div>

                                }
                        </Grid>

                            
                        {
                            menuReducer.loading?<ProgressSpinner />
                            :
                            menuReducer.menuEntries.map((item)=>{
                            
                                if(item.name != "plate_number" && item.name != "pdf") {
                                    return (

                                        <Grid 
                                            item 
                                            xs={12}
                                            key={item.id}                                
                                        >
                                            <TextField 
                                                required 
                                                label={item.name} 
                                                placeholder={item.name}
                                                name={item.name}ty  
                                                className= {classes.textfield}
                                                fullWidth
                                                {...register(formatInputName(item.name),{ required: true })}
                                            />
                                            {errors[item.name] && <span>This field is required</span>}
                                        </Grid>
                                    )
                                }

                            })
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
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitBtn} >
                                {menuDataReducer.loading ?<ProgressSpinner /> :"Submit"}
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );


    
}
