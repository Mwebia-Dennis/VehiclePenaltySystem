
import { Button,  Paper, Grid, TextField, Typography, Divider, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useState} from 'react'
import {useStyles} from '../loginForm/style'
import { useDispatch,useSelector } from 'react-redux'
import { CLEAR_ERROR, CLEAR_MESSAGE } from '../../../../store/reducers/auth/auth.types';
import { useSnackbar } from 'notistack';
import { forgotPasswordPageType } from '../../../../utils/constants'
import { useParams, useNavigate } from 'react-router-dom';
import { forgotPassword, checkEmail } from '../../../../store/reducers/auth/auth.actions';

export default (props) => {

    const { page_type } = useParams()
    const classes = useStyles()
    const navigate = useNavigate()
    const [formInputData, setFormInputData] = useState({})
    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const authState = useSelector((state) => state.authReducer)
    const email = localStorage.getItem("email")
    console.log(email)

    if(page_type == forgotPasswordPageType["1"] && !email) {
        navigate('auth/login')
        return
    }


    const textFields1 = [
        
        {
            
            placeholder: "Email",
            name: "email",
            type: "email"

        }
    ]
    const textFields2 = [
        
        {
            
            placeholder: "New Password",
            name: "new_password",
            type: "password"

        }
    ]

    const textFields = (page_type == forgotPasswordPageType["0"])?textFields1:textFields2


    const handleInputChange = (inputName, inputValue)=> {
        const data = formInputData
        data[inputName] = inputValue
        setFormInputData(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formInputData)
        if(formInputData == {}) {
            showSnackBar("All fields are required", "error")
            return
        }
        if(page_type == forgotPasswordPageType["0"]) {

            //checking email
            const formData = new FormData()
            formData.append('email', formInputData.email)
            localStorage.setItem('email', formInputData.email)
            dispatch(checkEmail(formData, navigate))

        }else if(page_type == forgotPasswordPageType["1"]) {
            
            //updating password
            const formData = new FormData()
            formData.append('email', email)
            formData.append('new_password', formInputData.new_password)
            dispatch(forgotPassword(formData, navigate))
        }

    }

    if(authState.message) {
        showSnackBar(authState.message, 'success');
        dispatch({ type: CLEAR_MESSAGE})
    }

    if(authState.error) {
        if("errors" in authState.error) {
            for (const key in authState.error.errors) {

                showSnackBar(authState.error.errors[key]["0"], 'error');
                
            }
        }else if("error" in authState.error) {

            showSnackBar(authState.error.error, 'error');
        }
        dispatch({ type: CLEAR_ERROR})
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
        return (formInputData != null && formInputData != undefined)?formInputData[name]:''
    }

    return (

        <>
            
            <Paper className={classes.root} >

                <Typography className={classes.header}>Vehicle Penalty</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">
                    {(page_type == forgotPasswordPageType["0"])?"Enter Email To Continue":"Enter New Password"}
                </Typography>

                <form onSubmit={handleSubmit}>
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
                                            type={item.type}
                                            name={item.name}
                                            className= {classes.textfield}
                                            defaultValue={getTextInputValue(item.name)}
                                            onChange={(e)=>handleInputChange(item.name, e.target.value)}
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
                            <Button type="submit" variant="contained" color="primary" className={classes.submitBtn} >
                                Submit
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );


    
}
