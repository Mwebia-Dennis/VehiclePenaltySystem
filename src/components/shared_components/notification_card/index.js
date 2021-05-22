import { Avatar, Box, Divider, Grid, Typography } from '@material-ui/core'
import React from 'react';
import Profile from '../../../images/profile.jpeg';
import { useStyles } from './style';

export default (props) => {

    const classes = useStyles();
    
    return (

        <>
        
            <Grid container className={classes.container}>

                <Grid xs={2} item >

                    <Grid 
                        container           
                        direction="column"
                        alignItems="center"
                        justify="center"
                        
                    >

                        <Grid item xs={12}>
                            <Avatar alt="Dennis Gitonga" src={Profile} className={classes.notifImage} />

                        </Grid>
                    </Grid>
                </Grid>

                <Grid xs={8} item className={classes.content}>
                    <Box>
                        <Typography className={classes.notifHeader} >Dennis added a new vehicle</Typography>
                        <Typography className={classes.notifDescription}>plate number: kav 123f </Typography>
                        <Typography className={classes.notifTime}>114 min ago </Typography>
                    </Box>
                </Grid>
            </Grid>


            <Divider />

        </>
    );

}
