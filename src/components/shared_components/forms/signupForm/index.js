
import { Button,  Paper, Grid, TextField, Typography, Divider, Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react'
import {useStyles} from './style'
import "react-datepicker/dist/react-datepicker.css";
import {signUpTextfields} from '../../../../utils/constants';

export default (props) => {

    const classes = useStyles();
    const [openBackdrop, setOpenBackdrop] = React.useState(false);

    const handleBackdropClose = () => {
        setOpenBackdrop(false);
      };
      const handleBackdropToggle = () => {
        setOpenBackdrop(!openBackdrop);
      };
    return (

        <>
            
            <Paper className={classes.root} >

                <Typography className={classes.header}>Vehicle Penalty</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">Sign Up To Start Working</Typography>
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
                        <Button variant="contained" color="primary" onClick={handleBackdropToggle} className={classes.submitBtn} >
                            Sign Up
                        </Button>

                    </Grid>
                </Grid>
            </Paper>
            <Backdrop className={classes.backdrop} open={openBackdrop} onClick={handleBackdropClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );


    
}
