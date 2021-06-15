import { Avatar, Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import NotFoundImage from '../../images/404.jpg'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({

    root: {
        margin: '10% 0'
    },
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    title: {
        textAlign: 'center',
    }
}))

export default (props) => {
    const classes = useStyles();

    return (

        <div>

            <Grid
                container            
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={4} className={classes.root} >
                    <Typography variant="h2" className={classes.title}>Welcome To Vehicle Penalty</Typography>
                    <Typography variant="h6" className={classes.title}>
                        Hello, to continue you need to verify your email. check your email for verification link
                    </Typography>
                    <Typography variant="h6" className={classes.title} style={{margin: '30px 0'}}>
                        <Button variant="contained" color="primary">Resend Link</Button>
                    </Typography>
                </Grid>
            </Grid>

        </div>

    );
}
