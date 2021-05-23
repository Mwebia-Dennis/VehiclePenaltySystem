
import { Button,  Paper, Grid, TextField, Typography, Link, Divider, Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react'
import {useStyles} from './style'
import "react-datepicker/dist/react-datepicker.css";

export default (props) => {

    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const handleBackdropClose = () => {
        setOpenBackdrop(false);
      };
      const handleBackdropToggle = () => {
        setOpenBackdrop(!openBackdrop);
      };


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
                                        name={item.name}
                                        className= {classes.textfield}
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
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={handleBackdropToggle} className={classes.submitBtn} >
                            Login
                        </Button>

                    </Grid>
                    <Grid item xs={12}>
                        <Typography  className={classes.bottomLinks} style={{marginTop: '20px',}}>
                            <Link href="/auth/forgot-password">Forgot Password</Link>

                        </Typography>
                        <Typography className={classes.bottomLinks}>Not A member yet?</Typography>
                        <Typography  className={classes.bottomLinks}>
                            
                            <Link href="/auth/signup">Sign Up</Link>

                        </Typography>

                    </Grid>
                </Grid>
            </Paper>
            <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleBackdropClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );


    
}
