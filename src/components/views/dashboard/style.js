
import { makeStyles } from '@material-ui/core/styles';



export const useStyles = makeStyles((theme) => ({

    chartCanvas: {

        margin: '10px',
        height: '500px',
        width: '95%',
        padding: '20px',
        
        [theme.breakpoints.down('sm')]: {
            height: '400px',
            width: '96%',
            padding: '5px',
            margin: '3px',
            marginTop: '10px'
        },
    },

    
    notificationCard: {

        width: '90%',
        marginLeft: '10%',
        
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft : '0',
        },
    },
    calendar: {

        height: '350px',
    },

}))