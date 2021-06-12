
import { Button,  Paper, Grid, TextField, Typography, Link, IconButton } from '@material-ui/core';
import React from 'react'
import {useStyles} from './style'
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { loginUser } from '../../../../store/reducers/auth/auth.actions';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Close } from '@material-ui/icons';
import { CLEAR_ERROR, CLEAR_MESSAGE } from '../../../../store/reducers/auth/auth.types';
import { forgotPasswordPageType } from '../../../../utils/constants'
import ProgressLoader from '../../ProgressBarSpinner'

export default (props) => {

    const classes = useStyles();
    const dispatch = useDispatch()
    const { register, handleSubmit, formState:{ errors } } = useForm()
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const authState = useSelector((state) => state.authReducer)



    
    const onSubmit = (data)=> {
        //handleBackdropToggle()
        dispatch(loginUser(data, navigate))
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


    const textFields = [
        
        {
            placeholder: "Email",
            name: "email",
            type: "email"

        },
        {
            placeholder: "password",
            name: "password",
            type: "password"

        },
    ]

    return (

        <>
            
            <Paper className={classes.root} >

                <Typography className={classes.header}>Vehicle Penalty</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">Login to Continue</Typography>

                <form  onSubmit={handleSubmit(onSubmit)}>

                    <Grid 
                        container 
                        spacing={2}
                    >

                            
                            {
                                textFields.map((item, index)=>{
                                    
                                    const name = item.name
                                    return (

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
                                                name={name}
                                                className= {classes.textfield}
                                                fullWidth 
                                                {...register(name, { required: true })}
                                            />
                                            {errors[name] && <span>This field is required</span>}
                                        </Grid>
                                    )
                                })
                            }                      

                    </Grid>

                    <Grid
                            container            
                            direction="column"
                            alignItems="center"
                            justify="center"
                    >
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitBtn} >
                                {authState.loading ? <ProgressLoader />: "Login"}
                            </Button>

                        </Grid>
                        <Grid item xs={12}>
                            <Typography  className={classes.bottomLinks} style={{marginTop: '20px',}}>
                                <Link href={"/auth/forgot-password/"+forgotPasswordPageType["0"]}>Forgot Password</Link>

                            </Typography>
                            <Typography className={classes.bottomLinks}>Not A member yet?</Typography>
                            <Typography  className={classes.bottomLinks}>
                                
                                <Link href="/auth/signup">Sign Up</Link>

                            </Typography>

                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </>
    );


    
}
