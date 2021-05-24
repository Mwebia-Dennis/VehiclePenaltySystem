import { Avatar, Button, Grid, Link, Typography } from '@material-ui/core';
import React from 'react'
import { useStyles } from './style'
import Profile from '../../../images/profile.jpeg';
import MailIcon from '@material-ui/icons/Mail';
import { Navigate, useNavigate } from 'react-router';

export default (props) => {
    
    const classes = useStyles();
    const navigate = useNavigate();
    return (

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
                    >
                        <Link href="mailto:dennisgitonga139@gmail.com" className={classes.btnLink}>
                            <MailIcon className={classes.icon} />

                        </Link>
                    </Button>
                </Grid>
            </Grid>

        </div>
    )
}
