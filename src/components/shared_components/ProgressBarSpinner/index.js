import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'

export default () => {
    
    return (
        <Grid 
            container
            direction="column"
            alignItems="center"
            justify="center"
        >

            <Grid item xs={3}>
                <CircularProgress />
            </Grid>

        </Grid>
    )
}
