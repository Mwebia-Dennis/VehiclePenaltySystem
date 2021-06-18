import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'

export default function ProgressBarSpinner () {
    
    return (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justify="center"
        >

            <Grid item xs={3}>
                <CircularProgress color="secondary"/>
            </Grid>

        </Grid>
    )
}
