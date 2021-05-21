import { Divider, Paper } from '@material-ui/core'
import React from 'react'
import { useStyles } from './style';

export default (props) => {
    
    const classes = useStyles();

    return (


        <>
        
            <Paper className={classes.root}>

                <div className={classes.header}>

                    {props.header}

                    
                    <Divider className={classes.divider}/>

                </div>

                <div className={classes.body}>
                    
                    {props.children}

                </div>


            </Paper>
        
        </>
    );
}
