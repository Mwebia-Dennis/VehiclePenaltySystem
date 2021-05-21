import { Avatar, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import Profile from '../../../../images/profile.jpeg';
import { useStyles, ProfileHeader } from './style';

export default (props) => {
    
    const {open} = props;
    const classes = useStyles();
    return (

        <Paper className={classes.root}>

            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            >
                
                <Grid item xs={12}>
                    
                    <Avatar alt="Dennis Gitonga" src={Profile} className={open?classes.largeAvatar:classes.smallAvatar} />
                
                </Grid>

                {
                    open?
                    <>
                        <Grid item xs={12}>
                            <ProfileHeader  className={classes.content} noWrap >Dennis Gitonga</ProfileHeader>                
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.content} noWrap>dennisgitonga139@gmail.com</Typography>                  
                        </Grid>
                    </>

                    :

                    <></>

                }
                
            </Grid>
            
        </Paper>
    );
}
