
import { Button,  Paper, Grid, TextField, Typography, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import React, { useState} from 'react'
import {useStyles} from '../loginForm/style'
import { useDispatch,useSelector } from 'react-redux'
import { CLEAR_ERROR, CLEAR_MESSAGE } from '../../../../store/reducers/auth/auth.types';
import { useSnackbar } from 'notistack';
import {  useNavigate } from 'react-router-dom';
import {  checkEmail } from '../../../../store/reducers/auth/auth.actions';
import ProgressLoader from '../../ProgressBarSpinner'

export default function ForgotPassword (props) {

    const classes = useStyles()
    const navigate = useNavigate()
    const [emailInput, setEmailInput] = useState('')
    const dispatch = useDispatch()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const authState = useSelector((state) => state.authReducer)


    const textFields = [
        
        {
            
            placeholder: "Email",
            name: "email",
            type: "email"

        }
    ]


    const handleInputChange = (e)=> {
        setEmailInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(emailInput === '') {
            showSnackBar("Email field is required", "error")
            return
        }

        //checking email
        dispatch(checkEmail(emailInput, navigate))

    }

    if(parseInt(("verified" in authState.data) && authState.data.verified) === 0 && authState.authenticated) {
        navigate('/auth/verify-email/'+authState.data.email)
    }
    if(parseInt(("verified" in authState.data) && authState.data.verified) === 1 && authState.authenticated) {
        navigate('/home')
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


    return (

        <>
            
            <Paper className={classes.root} >

                <Typography className={classes.header}>Vehicle Penalty</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">
                    Enter Email To Continue
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
                                            value={emailInput}
                                            onChange={handleInputChange}
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
                                {authState.loading ? <ProgressLoader />:"Submit"}
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );


    
}
