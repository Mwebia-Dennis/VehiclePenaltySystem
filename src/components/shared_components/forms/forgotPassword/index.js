
import { Button,  Paper, Grid, TextField, Typography, Divider, Backdrop, CircularProgress } from '@material-ui/core';
import React from 'react'
import {useStyles} from '../loginForm/style'

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

        }
    ]

    return (

        <>
            
            <Paper className={classes.root} >

                <Typography className={classes.header}>Vehicle Penalty</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">Enter Email To Continue</Typography>
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
                    <Grid item xs={8}>
                        <Button variant="contained" color="primary" onClick={handleBackdropToggle} className={classes.submitBtn} >
                            Submit
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
