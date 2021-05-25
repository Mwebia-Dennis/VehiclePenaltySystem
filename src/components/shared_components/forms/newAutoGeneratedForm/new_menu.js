import { Backdrop, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import {useStyles} from '../new_vehicle/style';
import BreadCrumb from '../../BreadCrump';


export default (props) => {

    const classes = useStyles();
    const { handlePageType } = props
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [menuInput, setMenuInput] = useState('')
    const links = [
        {
            url:"/home", 
            name: "Home"
        },
        {
            url:"/category/data", 
            name: "New Menu Entry"
        },
        
    ]

    const handleBackdropClose = () => {
        setOpenBackdrop(false);
      };
      const handleSubmit = () => {

        if(menuInput.trim() != ''){
            handlePageType(
                {
                    pageType: 'new_menu_fields',
                    menu: menuInput,
                }
                
            )

        }
      };
      const handleOnchange = (event) => {
        setMenuInput(event.target.value)
      }

    return (

        <>
            
            <BreadCrumb links={links} />
            <Paper className={classes.root} >

                <Typography className={classes.header}>Vehicle Penalty</Typography>
                <Typography variant="h6" className={classes.header2}  color="primary">Add Menu</Typography>
                <Grid
                    container 
                    spacing={2}
                >

                        
                    <Grid 
                        item 
                        xs={12}                                
                    >
                        <TextField
                            required 
                            label={"new_menu"} 
                            placeholder={"new_menu"}
                            name="new_menu"
                            className= {classes.textfield}
                            fullWidth
                            value={menuInput}
                            onChange={handleOnchange}
                        />
                    </Grid>                      

                </Grid>

                <Grid
                        container            
                        direction="column"
                        alignItems="center"
                        justify="center"
                >
                    <Grid item xs={12}>
                        
                        <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.submitBtn} >
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
