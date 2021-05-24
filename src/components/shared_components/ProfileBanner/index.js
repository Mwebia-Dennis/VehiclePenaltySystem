import { Avatar, Button, Divider, FormControl, Grid, InputLabel, Link, OutlinedInput, Paper, Typography } from '@material-ui/core';
import React from 'react'
import { useStyles } from './style'
import Profile from '../../../images/profile.jpeg';
import MailIcon from '@material-ui/icons/Mail';
import { PhotoCamera } from '@material-ui/icons';
import { signUpTextfields } from '../../../utils/constants'

export default (props) => {
    
    const classes = useStyles();
    return (

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
                        <Avatar src={Profile} className={classes.profile} />

                    </Grid>
                    <Grid item xs={8} className={classes.content}>
                        <Typography className={classes.title}>Dennis Gitonga</Typography>
                    </Grid>
                    <Grid item xs={8} className={classes.content}>
                        <Typography className={classes.link} noWrap>
                            dennisgitonga139@gmail.com
                        </Typography>
                    </Grid>
                    <Grid item xs={8} className={classes.content}>
                        <Button 
                            className={classes.button} 
                            variant="contained" 
                            color="primary"
                            startIcon={<MailIcon className={classes.icon} />}
                        >
                            <Link href="mailto:dennisgitonga139@gmail.com" className={classes.btnLink}>
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
                                signUpTextfields.map((item, index)=>{
                                    if(item.type == 'email' || item.type == 'password') {
                                        return (<div></div>)
                                    }else {
                                        return (
                                            <FormControl key={index} fullWidth className={classes.formControl} variant="outlined">
                                                <InputLabel htmlFor="outlined-adornment-amount">{item.placeholder}</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-amount"
                                                    placeholder={item.placeholder}
                                                    labelWidth={60}
                                                    type={item.type}
                                                    name={item.name}
                                                />
                                            </FormControl>

                                        )
                                    }
                                })
                            }

                            
                            <Button color="primary" variant="contained" className={classes.editBtn}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </div>

        </>
    )
}
