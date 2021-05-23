
import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';
import React, { forwardRef, useState } from 'react'
import {useStyles} from './style'
import BreadCrumb from '../../BreadCrump';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { paymentStatus } from '../../../../utils/constants';
import {DropzoneArea} from 'material-ui-dropzone'

export default (props) => {

    const classes = useStyles();
    const [penaltyDate, setPenaltyDate] = useState(new Date());
    const [paymentDate, setPaymentDate] = useState(new Date());

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
            placeholder: "Plate Number",
            name: "plate_number",
            type: "text"

        },
        {
            placeholder: "Penalty type",
            name: "penalty type",
            type: "text"

        },
        {
            placeholder: "Receipt Number",
            name: "receipt_number",
            type: "text"

        },
    ]

    const ExampleCustomInput = forwardRef(
        ({ value, onClick}, ref) => (

            <TextField 
                required 
                ref={ref}
                value={value}
                onClick={onClick}
                className= {classes.textfield}
                fullWidth
            />
        ),
      );

    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                <Typography className={classes.header}>Add New Penalty</Typography>
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

                        <Grid
                            item 
                            xs={12} 
                            md={6} 
                            >
                                <Typography variant="h6" className={classes.label}>Penalty Date</Typography>
                                <DatePicker 
                                    selected={penaltyDate}
                                    customInput={<ExampleCustomInput />}
                                    onChange={date => setPenaltyDate(date)}
                                    label="Penalty Date"
                                />
                        </Grid>
                        <Grid
                            item 
                            xs={12}
                            md={6}
                        >
                                <Typography variant="h6" className={classes.label}>Payment Date</Typography>
                                <DatePicker 
                                    selected={penaltyDate}
                                    customInput={<ExampleCustomInput />}
                                    onChange={date => setPaymentDate(date)}
                                    label="Payment Date"
                                    placeholder="Payment Date"
                                />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            >
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Payment Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                    >

                                        {
                                            paymentStatus.map((item,index)=>(
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
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
                        <Button variant="contained" color="primary" className={classes.submitBtn} >
                            Submit
                        </Button>

                    </Grid>
                </Grid>
            </Paper>
        </>
    );


    
}
