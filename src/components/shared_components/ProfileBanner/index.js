import { Avatar, Button, Divider, FormControl, Grid, InputLabel, Link, OutlinedInput, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useStyles } from './style'
import Profile from '../../../images/profile.jpeg';
import MailIcon from '@material-ui/icons/Mail';
import { PhotoCamera } from '@material-ui/icons';
import { signUpTextfields } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../store/reducers/auth/auth.actions';
import { getUserData } from '../../../store/reducers/users/user.actions';
import ProgressSpinner from '../ProgressBarSpinner';

export default (props) => {
    
    const classes = useStyles();
    const { id } = props;
    const dispatch = useDispatch()
    const reducer = (id.trim().toLowerCase() == 'current-user')?useSelector((state) => state.authReducer):
            useSelector((state) => state.userReducer);

    const editTextField =  [
        {
            placeholder: "Name",
            name: "name",
            type: "text",
            defaultValue: ("name" in reducer.data)?reducer.data.name: '', 
        },
        
        {
            placeholder: "Surname",
            name: "surname",
            type: "text",
            defaultValue: ("surname" in reducer.data)?reducer.data.surname: '', 

        },
    ]
    useEffect(() => {

        if(id.trim().toLowerCase() == 'current-user') {
            //get CURRENT authenticated user details
            dispatch(getUserDetails())
        }else if(!isNaN(id.trim().toLowerCase())) {

            //GET USER DETAILS
            dispatch(getUserData(id))
        }

    }, [''])


    return (

        <>

            {
                reducer.loading ?

                    <ProgressSpinner />


                :

                <>
                    <div className={classes.root}>

                    <div className={classes.overlay} />

                        <Grid 
                            container   
                            direction="column"
                            alignItems="center"
                            justify="center"
                        >
                            <Grid item xs={8} className={classes.content}>
                                <Avatar src={reducer.data.profile_img} className={classes.profile} />

                            </Grid>
                            <Grid item xs={8} className={classes.content}>
                                <Typography className={classes.title}>{reducer.data.name +' '+reducer.data.surname}</Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.content}>
                                <Typography className={classes.link} noWrap>
                                    {reducer.data.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.content}>
                                <Button 
                                    className={classes.button} 
                                    variant="contained" 
                                    color="primary"
                                    startIcon={<MailIcon className={classes.icon} />}
                                >
                                    <Link href={"mailto:"+reducer.data.email} className={classes.btnLink}>
                                        Send A Mail
                                    </Link>
                                </Button>
                                
                                
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="profile_image"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="profile_image">
                                    <Button 
                                        className={classes.button} 
                                        variant="contained" 
                                        color="secondary"
                                        component="span"
                                        startIcon={<PhotoCamera className={classes.icon} />}
                                    >
                                        Upload New Image
                                    </Button>
                                </label>
                            </Grid>
                        </Grid>

                    </div>

                    <div className={classes.root2}>
                        <Paper className={classes.editContainer}>

                            <Typography variant="h6"  className={classes.editTitle}>
                                Edit Account
                            </Typography>
                            <Divider  className={classes.editDivider} />
                            
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Typography className={classes.editContent}>
                                        Enter your account info.Your username and email will be viewed publicly.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    
                                    {
                                        editTextField.map((item, index)=>(

                                            <FormControl key={index} fullWidth className={classes.formControl} variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-amount">{item.placeholder}</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-amount"
                                                    placeholder={item.placeholder}
                                                    labelWidth={60}
                                                    type={item.type}
                                                    name={item.name}
                                                    defaultValue={item.defaultValue}
                                                />
                                            </FormControl>

                                        ))
                                    }

                                    
                                    <Button color="primary" variant="contained" className={classes.editBtn}>
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>

                </>
            }
            

        </>
    )
}
