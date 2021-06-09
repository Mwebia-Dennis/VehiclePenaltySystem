
import { Button,  Paper, Grid, TextField, Typography, Divider, Backdrop, CircularProgress, Link, IconButton } from '@material-ui/core';
import React from 'react'
import {useStyles} from './style'
import "react-datepicker/dist/react-datepicker.css";
import {signUpTextfields} from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Close } from '@material-ui/icons';
import { useDispatch,useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { CLEAR_ERROR, CLEAR_MESSAGE } from '../../../../store/reducers/auth/auth.types';
import { signUpUser } from '../../../../store/reducers/auth/auth.actions';
import ProgressLoader from '../../ProgressBarSpinner'

export default (props) => {

    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const dispatch = useDispatch()
    const { register, handleSubmit, formState:{ errors } } = useForm()
    const navigate = useNavigate()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const authState = useSelector((state) => state.authReducer)

    const handleBackdropClose = () => {
        setOpenBackdrop(false);
      };
      const handleBackdropToggle = () => {
        setOpenBackdrop(!openBackdrop);
      };
      const onSubmit = (data)=> {
          //handleBackdropToggle()
          dispatch(signUpUser(data, navigate))
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
                <Typography variant="h6" className={classes.header2}  color="primary">Sign Up To Start Working</Typography>

                
                <form  onSubmit={handleSubmit(onSubmit)}>
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
                                            type={item.type}
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
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary"  className={classes.submitBtn} >
                                {authState.loading ? <ProgressLoader />: "Sign Up"}
                            </Button>

                        </Grid>
                        
                        <Grid item xs={12}>
                            <Typography className={classes.bottomLinks} style={{marginTop: '20px',}}>
                                Already a member?
                            </Typography>
                            <Typography  className={classes.bottomLinks}>
                                
                                <Link href="/auth/login">Login</Link>

                            </Typography>

                        </Grid>
                    </Grid>
                </form>
            </Paper>
            <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleBackdropClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );


    
}
